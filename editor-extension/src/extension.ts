import * as vscode from 'vscode';
import { type Startable, startIsolated } from './activation.ts';
import { holdDerivers } from '../../tools/lib/deriver-hold.ts';
import * as agentTree from './features/agent-tree/activate.ts';
import * as domainTree from './features/domain-tree/activate.ts';
import * as editorLayout from './features/editor-layout/activate.ts';
import * as pageTree from './features/page-tree/activate.ts';
import * as statusBar from './features/status-bar/activate.ts';
import * as workTree from './features/work-tree/activate.ts';
import * as terminalRename from './features/terminal-rename/activate.ts';
import * as transcript from './features/transcript/activate.ts';
import {
	createObservationStore,
	recordObservation,
	setObservationStore,
} from './seat/observation-store.ts';
import { readProcess } from './seat/window-identity.ts';

const FEATURE_TIMEOUT_MS = 20_000;

const HOLD_MS = 60_000;

const features = (context: vscode.ExtensionContext): readonly Startable[] => [
	{ name: 'terminal-rename', start: async () => terminalRename.activate(context) },
	{ name: 'transcript', start: async () => transcript.activate(context) },
	{ name: 'agent-tree', start: async () => agentTree.activate(context) },
	{ name: 'domain-tree', start: async () => domainTree.activate(context) },
	{ name: 'work-tree', start: async () => workTree.activate(context) },
	{ name: 'page-tree', start: async () => pageTree.activate(context) },
	{ name: 'status-bar', start: async () => statusBar.activate(context) },
	{ name: 'editor-layout', start: async () => editorLayout.activate(context) },
];

export async function activate(context: vscode.ExtensionContext): Promise<void> {
	const output = vscode.window.createOutputChannel('Ops: Activation');
	context.subscriptions.push(output);
	holdDerivers(HOLD_MS);

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

	if (missing.length > 0) {
		void vscode.window.showWarningMessage(
			`Ops: ${missing.length} of ${startables.length} features did not activate ` +
			`(${missing.map((o) => o.name).join(', ')}). The rest are running. ` +
			`See the Ops: Activation output.`
		);
	}
}

export function deactivate(): undefined { }
