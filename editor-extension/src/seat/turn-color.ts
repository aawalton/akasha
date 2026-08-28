/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import * as path from 'node:path';
import { z } from 'zod';
import { akashaRoot, repositoryPath, runVerb, turnColoursVerbPath } from '../harness-call.ts';
import { colorNamed } from '../palette.ts';

/**
 * The colour a seat's turn state is drawn in, as a colour the tab strip can be painted.
 *
 * THE HARNESS IS ASKED RATHER THAN THE STORE READ. A seat's turn state is read from the records it
 * carries; that state names a domain; that domain names a colour. All three hops stand in the
 * instructions repository and none of them is here — what this file does is ask for the resolved
 * name and turn it into a colour value. It cannot disagree with the corpus about which colour a
 * state is drawn in, because it never works it out.
 *
 * WHY NOT THE BUCKET, WHICH THIS USED TO READ. It read a `turn-colour` key stamped onto the seat
 * when its turn last moved. A stamp cannot carry the state the corpus now draws blue: a seat is
 * `idle-pending` when something is arranged to start it again, and that becomes true and stops
 * being true without any hook firing, so no stamp is ever taken at the moment it changes. The
 * writer of that key was removed on 2026-08-18 and every tab in the strip went uncoloured, which
 * is the reading no stamp can be trusted to hold.
 *
 * THE SAME READING THE PANELS DRAW FROM. `agent-forest` answers the trees with a colour per row
 * and this answers the tab strip with a colour per seat, both resolved by the corpus at the moment
 * they are asked. Two surfaces reading one authority cannot come apart on screen.
 *
 * THE ANSWER IS A COLOUR VALUE RATHER THAN A NAME, and the boundary is drawn there deliberately.
 * A caller handed `green` has to know where green is written down, and the tab strip is the
 * furthest place in the system from that answer. Handed `#2d8c57` it has nothing left to get
 * wrong.
 *
 * WHICH NAMES RESOLVE IS NOT DECIDED HERE. `../palette` holds the set and drops a name it does not
 * declare, and the trees read the same module. The palette used to stand in this file with the
 * trees keeping a hand-spelled three of their own beside them, which is how two surfaces reading
 * one corpus came to accept different sets of names.
 */

/**
 * The sidecar a seat's turn state is written into, as a pattern a watcher takes.
 *
 * SPELLED ONCE, HERE. This pattern and the directories below have to agree with what the harness
 * actually writes, and they went on naming `*.fast.yaml` for long enough that the watch matched
 * nothing at all: the sidecar had been renamed to `.uncommitted.yaml` and no file by the old name
 * was left anywhere in the memory checkout. A watcher that matches nothing does not fail — it goes
 * quiet, and the colour it existed to refresh falls back to whatever else happens to fire.
 *
 * THE SCRATCH FILE IS STILL EXCLUDED. The sidecar is written by rename from a
 * `<name>.uncommitted.yaml.<pid>.part`, which this does not match, so a write lands here once.
 */
export const SEAT_SIDECAR_GLOB = '*.uncommitted.yaml';

/** Where seat pages stand under the akasha checkout. */
const AKASHA_SEAT_DIR = path.join('agent', 'seat');

/**
 * The directories the seats' pages stand in, for a caller that wants to watch them for changes.
 *
 * WATCHED THOUGH THEY ARE NOT READ. A hook writes a seat's turn state into the sidecar beside its
 * page the moment a turn starts or ends, so one of these changing is exactly the moment a tab's
 * colour should change — and it is a moment no terminal event marks. What the watcher triggers is
 * a fresh ask, rather than a read of the file that just moved.
 *
 * ONE DIRECTORY, AND IT IS AKASHA'S. Seat pages stand in `akasha:agent/seat` and nowhere else:
 * `SEAT_PLACES` in `tools/lib/agent-page-place.ts` is what the harness reads them by and it
 * names that one place. A watcher pointed anywhere else does not fail — it goes quiet, and the
 * colour it exists to refresh falls back to whatever else happens to fire.
 *
 * STILL A LIST, because every caller stands up one watch per entry and a second place for seat
 * pages should be a line here rather than a change at each of them.
 *
 * ANSWERED THROUGH `repositoryPath`, which is what keeps each to one watch. `/home` on this
 * machine is a symlink to `var/home`, so an unresolved path names the same directory the workspace
 * already holds under a spelling the workbench cannot match, and stands up a second recursive
 * watch over the same files.
 *
 * RESOLVED AT CALL TIME rather than held in a constant, so an environment that names another
 * checkout is honoured wherever it is set rather than only where it was set before this module
 * was first imported.
 */
export function seatDirs(): readonly string[] {
	return [repositoryPath(seatPagesDir())];
}

/**
 * The one directory seat pages stand in, for a caller that wants to read them rather than watch.
 *
 * SPELLED HERE AND NOWHERE ELSE. A reader that builds this path itself is a second answer to
 * where the seats are, free to go on naming the old place after a move — and a reader pointed at
 * a directory holding no seat reports no seats, which is the same shape as a workstation with
 * none running.
 */
export function seatPagesDir(): string {
	return path.join(akashaRoot(), AKASHA_SEAT_DIR);
}

/**
 * The ceiling on one ask. Tighter than the panels' because this command reads files and no
 * database, and because a sweep runs on every change of focus: past this it is stuck rather than
 * slow, and a wait with no ceiling on that path would hold the whole sweep.
 */
const ASK_TIMEOUT_MS = 5_000;

/** Room to grow into rather than a fit: one short colour name per seat in the window. */
const MAX_BUFFER = 1024 * 1024;

/** A colour name per seat. Spelled once, because the answer carries it under two keys. */
const NAMED_PER_SEAT = z.record(z.string(), z.string());

/**
 * What the command answered: a colour name per seat, and only for the seats it could answer for.
 *
 * `passthrough` on the record's values is not wanted here — a value that is not a string is the
 * command having changed underneath this reader, and dropping it silently would draw those tabs
 * at no colour while looking exactly like seats that had none.
 *
 * BOTH KEYS ARE OPTIONAL AND ONE OF THEM ARRIVES. The command spells this record `colours` today
 * and will spell it `colors`; a shipped build reads the payload it was built against, so this
 * reader has to accept the new spelling before the command starts sending it.
 * `pages/domain/readout-system.md` puts the ordering as Field Retirement: a rename is a drop, and
 * a drop comes after the readout stopped reading the field. A schema demanding either name alone
 * would empty the tab strip on the commit that renamed the key — and an emptied strip is a claim,
 * that no seat in this window is drawn in any colour, which a reader that failed to recognise the
 * envelope is never in a position to make.
 *
 * NEITHER KEY IS NOT A SHAPE THIS ACCEPTS. Both being optional makes an answer carrying no record
 * at all parse, so that absence is caught below and thrown on rather than read as a window holding
 * no coloured seat.
 */
const ANSWER_SCHEMA = z.object({
	colors: NAMED_PER_SEAT.optional(),
	colours: NAMED_PER_SEAT.optional(),
});

/**
 * The colours an answer carries, keyed by seat, with every name the palette does not declare
 * dropped on the way through.
 *
 * SEPARATE FROM THE CALL so that what this reader does with an answer can be exercised without a
 * process. The call is one line and its failures are the child's; the narrowing below is this
 * file's own and is where a command that changed underneath it would show.
 */
export function coloursFromAnswer(stdout: string, from: string): ReadonlyMap<string, string> {
	let answer: unknown;
	try {
		answer = JSON.parse(stdout);
	} catch (err) {
		throw new Error(`${from} did not print JSON: ${String(err)}`);
	}
	const parsed = ANSWER_SCHEMA.safeParse(answer);
	if (!parsed.success) {
		throw new Error(`${from} answered a record this cannot read: ${parsed.error.message}`);
	}
	// The new spelling wins where both stand, so a command that sends the pair through one release
	// hands this the key it will be left with rather than the one going away.
	const named = parsed.data.colors ?? parsed.data.colours;
	if (named === undefined) {
		throw new Error(`${from} answered neither a \`colors\` nor a \`colours\` record`);
	}
	const found = new Map<string, string>();
	for (const [id, name] of Object.entries(named)) {
		const color = colorNamed(name);
		if (color !== undefined) { found.set(id, color); }
	}
	return found;
}

/**
 * The colour each of these seats is drawn in, omitting every one that resolves to none.
 *
 * ABSENCE IS THE ORDINARY CASE rather than a fault, and the map says so by leaving the seat out.
 * An id that turned out to hold no seat is answered for by nothing, and a state whose colour this
 * palette has no shade for resolves to none — both mean the same thing to a caller, which is that
 * this terminal is not one of the coloured ones. A stopped seat is the second of those: the corpus
 * draws it in a muted name this palette does not carry, so its tab keeps no colour.
 *
 * IT THROWS RATHER THAN ANSWERING EMPTY where the ask itself could not be made. An empty answer is
 * a claim — that no seat in this window is drawn in any colour — and a call that failed is never
 * in a position to make it. Answering empty would take the colour off every tab in the strip on a
 * transient failure, which is the loudest possible way to report that nothing could be read.
 */
export async function readSeatTurnColors(
	agentIds: readonly string[]
): Promise<ReadonlyMap<string, string>> {
	// A window holding no seat asks nothing. The answer is the same and a process is not started.
	if (agentIds.length === 0) { return new Map<string, string>(); }
	const from = turnColoursVerbPath();
	const stdout = await runVerb(from, agentIds, { timeout: ASK_TIMEOUT_MS, maxBuffer: MAX_BUFFER });
	return coloursFromAnswer(stdout, from);
}
