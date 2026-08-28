/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import * as vscode from 'vscode';
import { type Startable, startIsolated } from './activation.ts';
import * as agentTree from './features/agent-tree/activate.ts';
import * as domainTree from './features/domain-tree/activate.ts';
import * as editorLayout from './features/editor-layout/activate.ts';
import * as workTree from './features/work-tree/activate.ts';
import * as terminalRename from './features/terminal-rename/activate.ts';
import * as transcript from './features/transcript/activate.ts';
import {
	createObservationStore,
	recordObservation,
	setObservationStore,
} from './seat/observation-store.ts';
import { readProcess } from './seat/window-identity.ts';

/**
 * How long any one feature is waited on before activation stops holding for it.
 *
 * Generous on purpose. This is not a budget for how long a feature ought to take
 * — reaching it means something is wedged rather than slow, which is the only
 * case it exists to get out of.
 */
const FEATURE_TIMEOUT_MS = 20_000;

/**
 * The six, and they are independent of one another.
 *
 * THE STATUS BAR AND THE PAGE TREE ARE NOT AMONG THEM. Each answers its queries in this process,
 * and those reads are synchronous underneath: measured on 2026-08-27 at 18.6s over twenty queries
 * and 4.5s over twelve, about 90% of either being git subprocesses. For the whole of one, no timer
 * in this process fires — the tab colours poll every second and were not running. The page tree
 * has no poll, which is not the safeguard it looks like: it watches every document in the
 * repository, and pages land here several times a minute.
 *
 * WHAT KEEPS THE THREE TREE PANELS OUT OF THAT is that each reads through `runVerb` or
 * `runOps`, which are subprocesses, so their work is off this thread whatever it costs them.
 *
 * Out on Alan's call until a page query answers quickly. Both `activate.ts` files still stand and
 * nothing imports them.
 *
 * CHECKED RATHER THAN ASSUMED, on 2026-08-13. No feature's `activate.ts` imports
 * another feature's `activate.ts`, and none reads another's module state — each
 * keeps its own output channel and sets it inside its own activate. What they
 * share is libraries rather than activations: `seat/terminal-lookup`,
 * `seat/editor-group`, `seat/editor-layout`, `seat/mode` and `harness-call`.
 *
 * TWO EDGES BETWEEN FEATURES, both imports of a MODULE rather than dependencies
 * on a feature: `agent-tree/forest.ts` imports `transcript/sources` for
 * `seatTranscriptOf`, and `editor-layout/activate.ts` imports `agent-tree/columns`
 * for `readSeatLookup` and `readSeatTerminals`. Neither imported module holds
 * state its own feature's activate sets up — `columns.ts` keeps its memento
 * behind a factory the caller owns, and the two readers are functions of their
 * arguments. So nothing here depends on the order they run in, and they are
 * started together.
 */
const features = (context: vscode.ExtensionContext): readonly Startable[] => [
	{ name: 'terminal-rename', start: async () => terminalRename.activate(context) },
	{ name: 'transcript', start: async () => transcript.activate(context) },
	{ name: 'agent-tree', start: async () => agentTree.activate(context) },
	{ name: 'domain-tree', start: async () => domainTree.activate(context) },
	{ name: 'work-tree', start: async () => workTree.activate(context) },
	{ name: 'editor-layout', start: async () => editorLayout.activate(context) },
];

/**
 * Starts all six features, each isolated from the others.
 *
 * THIS WAS SIX `await`s IN A ROW, and on 2026-08-13 that cost Alan every panel he
 * has. `terminal-rename` went first, awaited a terminal that never reported its
 * process, and never came back — so `status-bar`, `transcript` and all three
 * `createTreeView` calls after it never ran. What he met was VS Code's own
 * "There is no data provider registered that can provide view data" on three
 * empty panels, which names no cause and reads exactly like the panels being
 * broken again.
 *
 * The rules about waiting live in `activation.ts`, where the test suite can
 * reach them; what is left here is which features there are and what to say when
 * one of them does not come back.
 */
export async function activate(context: vscode.ExtensionContext): Promise<void> {
	const output = vscode.window.createOutputChannel('Ops: Activation');
	context.subscriptions.push(output);

	// SET UP BEFORE ANY FEATURE STARTS, AND NOT A FEATURE ITSELF. Every feature
	// reports into this, so it has to exist before the first one runs; and it is
	// deliberately not a ninth `Startable`, because the eight are isolated from
	// each other precisely so that no one of them decides whether another runs.
	// A store that failed to be made would be exactly such a thing.
	//
	// THE WINDOW IS THIS PROCESS, NOT `vscode.env.sessionId`. That value is the
	// constant `someValue.sessionId` in every served instance of this fork, so the
	// first version of this wrote one record for all of them: two live windows, one
	// record, describing neither, and a verifier's own driven instance quietly
	// replacing the window being verified. See `seat/window-identity.ts`.
	//
	// AND IT IS THE NAME `features/editor-layout/activate.ts` ALREADY PROJECTS THE
	// ARRANGEMENT UNDER, so what each feature observed and how the window is laid out
	// stand as two properties of one page rather than two records of one window.
	const windowName = await readProcess(process.pid);
	const observations = createObservationStore({
		window: windowName,
		onError: (message) => output.appendLine(`[observations] ${message}`),
	});
	setObservationStore(observations);
	output.appendLine(`[activate] observations to ${observations.url}`);
	context.subscriptions.push({
		dispose: () => {
			setObservationStore(undefined);
			void observations.dispose();
		},
	});

	const startables = features(context);
	output.appendLine(`[activate] starting ${startables.length} features`);

	const outcomes = await startIsolated(startables, FEATURE_TIMEOUT_MS, (line) =>
		output.appendLine(line)
	);

	// EACH FEATURE'S ACTIVATION UNDER ITS OWN NAME rather than a tally under this
	// one. It is what makes an absence in the record mean something: a verifier
	// meeting a feature with an activation and no observations knows it started and
	// has seen nothing, which is a different fact from the feature not being here.
	for (const outcome of outcomes) {
		recordObservation(outcome.name, {
			activation: { state: outcome.state, ms: outcome.ms },
			...(outcome.error === undefined ? {} : { failure: outcome.error }),
		});
	}

	const missing = outcomes.filter((o) => o.state !== 'activated');
	output.appendLine(
		`[activate] ${outcomes.length - missing.length} of ${outcomes.length} activated` +
		(missing.length === 0 ? '' : `; ${missing.map((o) => `${o.name} ${o.state}`).join(', ')}`)
	);

	// SAID OUT LOUD RATHER THAN LEFT IN A CHANNEL NOBODY HAS OPEN. A feature that
	// failed or wedged leaves part of the editor quietly absent, and absent looks
	// exactly like empty. This is the notice that was missing on 2026-08-13, when
	// the only way to find out was to read a log afterwards. It fires only when
	// something actually went wrong.
	if (missing.length > 0) {
		void vscode.window.showWarningMessage(
			`Ops: ${missing.length} of ${startables.length} features did not activate ` +
			`(${missing.map((o) => o.name).join(', ')}). The rest are running. ` +
			`See the Ops: Activation output.`
		);
	}
}

export function deactivate(): undefined { }
