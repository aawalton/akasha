/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { dropDerivers } from '../../../../tools/lib/deriver-hold.ts';
import { askSeatForest } from '../../../../tools/lib/seat-forest-asked.ts';
import { colorOfState } from '../../../../tools/lib/seat-turn-color.ts';
import type { SeatMode } from '../../seat/mode.ts';
import { seatTranscriptOf } from '../transcript/sources.ts';
import type { HarnessRow } from './harness.ts';
import { readSeatPlaces } from './lookup.ts';
import type { SubagentNode, SubagentReader } from './subagents.ts';

/**
 * The principal that makes a seat a root, read off the ROW.
 *
 * THE LOCAL STORE IS DELIBERATELY NOT CONSULTED, and this is a decision to leave
 * alone rather than an omission to repair. #18381 put `principal` on the row, and
 * a seat started before that deploy carries one only in its store — measured on
 * this host, 3 live rows say `alan` where 10 stores do. Alan was shown that gap
 * and chose the row anyway: he would rather it nudge him into restarting the
 * seats that predate it than have a fallback quietly paper over them. The two
 * carriers never disagree where both hold a value, so nothing here is at risk of
 * reading the wrong answer — only of reading none.
 */
const ALAN = 'alan';

/** Forget every derived reading, so the next one is worked out from the files as they stand now. */
export function dropSeatAnswers(): void {
	dropDerivers();
}

/**
 * The three fields the nesting reads. Narrower than `AgentRow`, which an actual
 * row satisfies structurally: the assembly has no business demanding thirty-odd
 * columns it never looks at, and asking for exactly what it reads is what lets a
 * caller — a test included — hand it a row without pretending to build one.
 */
export interface SeatRow {
	readonly id: string;
	readonly name: string | null;
	readonly parent_agent_id: string | null;
	/** `alan`, `agent`, or null where nobody stated one. */
	readonly principal: string | null;
	/** `working`, `waiting`, `stopped` or `unknown`, or null where the row states none. */
	readonly state: string | null;
	/** What a waiting seat waits on, and null for every other state. */
	readonly waitingOn: string | null;
	/**
	 * The colour name the harness answered, NOT a shade. Which colour a state is drawn in is
	 * stated in akasha, one line on the state's own domain; what that
	 * colour looks like is this extension's, contributed in its manifest. A hex crossing the
	 * boundary would put the palette in the corpus and the decision in the panel, both wrong.
	 */
	readonly colour: string | null;
}

/**
 * What a row on the tree stands for. Both are agents — a seat is a place an
 * agent works from, a subagent is one a seat runs with the Agent tool — which is
 * why one tree holds them and why it is named for what they have in common.
 */
export type AgentKind = 'seat' | 'subagent';

export interface AgentNode {
	readonly id: string;
	/** The seat's whole name, or its id where the row carries no name. */
	readonly name: string;
	readonly kind: AgentKind;
	/**
	 * Where the seat runs. A STOPPED SEAT STILL HAS ONE: on a `live: false` row this
	 * is the place its run toggle would bring it back to, which is why the place
	 * toggle is offered there rather than greyed out. Absent on a subagent, which is
	 * not a seat and carries no toggles.
	 */
	readonly place?: SeatMode;
	/**
	 * Whether the seat is in the live listing. `false` marks an ancestor fetched
	 * only because something under it is running — the row the muted colour is for.
	 * A subagent is only ever on the tree while running, so it is always `true`.
	 */
	readonly live: boolean;
	/**
	 * The agent's turn state. A subagent on this tree is always `working`: it takes a turn of its
	 * own, that turn ends by returning to the seat that ran it, and a returned one is dropped
	 * before it reaches here.
	 */
	readonly state?: string | undefined;
	/** What a waiting seat waits on. Absent on every other state and on a subagent, which never waits. */
	readonly waitingOn?: string | undefined;
	/** The colour name for that state. Absent where the state is one no domain stands for. */
	readonly colour?: string | undefined;
	readonly children: readonly AgentNode[];
}

/**
 * The live seats, nested by ownership, with any stopped ancestor holding a live
 * branch fetched back in.
 *
 * WHICH SEATS THOSE ARE IS THE PAGES' ANSWER, not this file's. Every field on a row is a property
 * some page declares, so one query per page type carries them all and the joins happen in
 * `tools/lib/seat-forest-asked.ts`. What is here is the part that is about the VIEW: the nesting,
 * the pruning of branches holding nothing running, the ordering, and the subagents.
 */
export interface AgentForest {
	readonly roots: readonly AgentNode[];
	/**
	 * How many of the seats in hand recorded Alan as their principal. Reported
	 * because the tree itself cannot show whether the store was read: every such
	 * seat is parentless today, so a read returning nothing would root the same rows
	 * through the parent fallback and look identical on screen.
	 */
	readonly alanPrincipalCount: number;
	/** What the header reports: running agents on the tree, seats and subagents alike. */
	readonly runningCount: number;
}

export async function readAgentForest(subagents: SubagentReader): Promise<AgentForest> {
	const rows: readonly HarnessRow[] = askSeatForest().map((one) => ({ ...one, colour: one.color }));
	const liveIds = new Set(rows.filter((row) => row.live).map((row) => row.id));

	// Only a LIVE seat is read for subagents. A stopped seat's Claude is dead, so
	// its subagents are dead with it — but its transcript carries no notification
	// saying so, because nothing was left running to write one. Reading it would
	// hang a row that claims to be working under a seat that is not.
	const running = new Map<string, readonly SubagentNode[]>();
	await Promise.all(
		[...liveIds].map(async (id) => {
			const stated = seatTranscriptOf(id);
			if (stated === null) { return; }
			try {
				running.set(id, await subagents.forSeat(id, stated.transcriptPath));
			} catch {
				// A transcript that cannot be read leaves the seat's own row standing
				// with nothing under it, which is what a seat running no subagents looks
				// like anyway. One unreadable file must not cost the whole tree.
			}
		})
	);
	subagents.dropUntouched();

	let alanPrincipalCount = 0;
	for (const row of rows) { if (row.principal === ALAN) { alanPrincipalCount++; } }

	const places = readSeatPlaces(rows);
	const roots = assembleForest(rows, liveIds, running, places, workingColour());
	return { roots, alanPrincipalCount, runningCount: countRunning(roots) };
}

/**
 * The state every subagent on this tree is in, spelled once.
 *
 * THE PANEL KNOWS THE STATE AND ASKS ONLY FOR THE COLOUR, which is the division the corpus
 * draws: a subagent is working or stopped, this tree holds only the working ones, and which
 * colour working is stays on `pages/domain/agent-turn-working.domain.md`.
 */
const WORKING = 'working';

/**
 * What a working agent is drawn in, or undefined where the harness could not be asked.
 *
 * UNDEFINED WHERE NO DOMAIN STANDS FOR THE STATE. A subagent row with no colour falls through to
 * the muted foreground it had before it had a state, which costs the subagents their colour and
 * costs the tree nothing else.
 */
function workingColour(): string | undefined {
	return colorOfState(WORKING) ?? undefined;
}

/**
 * The running agents this tree holds — seats and subagents alike, at every depth.
 *
 * COUNTED OFF THE ASSEMBLED TREE rather than off the rows it was built from, so
 * the number and the rows cannot disagree. A badge counts what its panel shows,
 * and this panel is deliberately not the whole roster: it drops the dead, and
 * seats whose row carries no principal sit lower in it than Alan may expect. A
 * count taken from anywhere else would read as a defect in the tree.
 *
 * A STOPPED SEAT IS NOT COUNTED even though it has a row. It is on screen to hold
 * the branch beneath it, and it is not working.
 */
export function countRunning(nodes: readonly AgentNode[]): number {
	let total = 0;
	for (const node of nodes) {
		if (node.live) { total++; }
		total += countRunning(node.children);
	}
	return total;
}

/**
 * Nests the rows by `parent_agent_id` to whatever depth they carry.
 *
 * A SEAT ALAN IS THE PRINCIPAL OF IS A ROOT, whatever it was spawned by. He is the
 * ultimate root of the fleet, and rooting on the principal rather than on whether
 * a session is interactive is what keeps a seat in one place when he moves it
 * between interactive and headless.
 *
 * A row whose parent is not among the rows is also a root — that covers a seat
 * whose parent could not be fetched, which is shown at the root rather than
 * dropped.
 *
 * A seat that recorded no principal is NOT a root on that ground. Absence is
 * unknown rather than a default, and it is answered the way the seat name answers
 * it: with the agent form. Reading silence as Alan would make a root of every seat
 * nobody stated one for, which is most of the store.
 *
 * The descent carries a visited set. A parent id may name a seat that has since
 * died and nothing in the data forbids a cycle, so a chain that closes on itself
 * would otherwise recurse until the stack gave out.
 *
 * WHAT IS LEFT IS WHAT IS WORKING. A branch holding nothing running is dropped
 * whole, so a stopped seat stands only where something live sits beneath it, and
 * the tree offers no way to reveal the rest. That is Alan's call and the thing
 * that decides whether the panel is worth looking at: most of the roster is dead,
 * and a stopped seat earns its row by holding a running one.
 */
export function assembleForest(
	rows: readonly SeatRow[],
	liveIds: ReadonlySet<string>,
	subagentsBySeat: ReadonlyMap<string, readonly SubagentNode[]>,
	places: ReadonlyMap<string, SeatMode>,
	/**
	 * What a working agent is drawn in, which every subagent row on this tree takes. Optional
	 * because it is the one input here that crosses a process boundary: undefined leaves the
	 * subagents at the muted foreground rather than leaving the tree unbuilt.
	 */
	drawnWorking?: string
): readonly AgentNode[] {
	const present = new Set(rows.map((r) => r.id));
	const childrenByParent = new Map<string, SeatRow[]>();
	const roots: SeatRow[] = [];
	for (const row of rows) {
		const parent = row.parent_agent_id;
		if (row.principal !== ALAN && parent !== null && parent !== row.id && present.has(parent)) {
			const siblings = childrenByParent.get(parent);
			if (siblings === undefined) { childrenByParent.set(parent, [row]); }
			else { siblings.push(row); }
		} else {
			roots.push(row);
		}
	}

	const build = (row: SeatRow, visited: ReadonlySet<string>): AgentNode => {
		const seen = new Set(visited).add(row.id);
		const seats = (childrenByParent.get(row.id) ?? [])
			.filter((c) => !seen.has(c.id))
			.map((c) => build(c, seen))
			.filter(holdsSomethingRunning);
		// A seat's subagents sit alongside the seats it spawned, under the one row
		// for it, so the branch shows everything working underneath rather than one
		// kind of thing working underneath.
		const subagents = (subagentsBySeat.get(row.id) ?? []).map((one) => toAgentNode(one, drawnWorking));
		return {
			id: row.id,
			name: row.name ?? row.id,
			kind: 'seat',
			live: liveIds.has(row.id),
			place: places.get(row.id) ?? 'headless',
			state: row.state ?? undefined,
			waitingOn: row.waitingOn ?? undefined,
			colour: row.colour ?? undefined,
			children: [...sortByName(seats), ...subagents],
		};
	};

	return sortByName(roots.map((r) => build(r, new Set())).filter(holdsSomethingRunning));
}

/**
 * A subagent's row. Already ordered by the reader that produced it, and left in
 * that order rather than sorted in with the seats: the two are different kinds of
 * thing and the seats come first, so a seat does not move down the list because a
 * subagent's description happened to sort above its name.
 *
 * WORKING, ALWAYS. A subagent's turn ends by returning to the seat that ran it, and the fold
 * that produced this node drops the returned ones — so a row that got this far is one whose
 * turn has not ended. It is stated here rather than left blank because the state is what the
 * colour is for, and a blank one would draw the same as a row nothing is known about.
 */
function toAgentNode(node: SubagentNode, drawnWorking: string | undefined): AgentNode {
	return {
		id: node.key,
		name: node.label,
		kind: 'subagent',
		live: true,
		state: WORKING,
		colour: drawnWorking,
		children: node.children.map((child) => toAgentNode(child, drawnWorking)),
	};
}

/**
 * Whether this row or anything under it is running.
 *
 * Applied at the roots and pruning the whole branch, which is what leaves the
 * tree holding only work in progress. A live seat and a running subagent each
 * qualify on their own; a stopped seat qualifies only through what it holds.
 */
function holdsSomethingRunning(node: AgentNode): boolean {
	return node.live || node.children.some(holdsSomethingRunning);
}

/**
 * A stable order, so a refresh never reshuffles the rows under the pointer. Name
 * is the key rather than creation time because it is what the row displays.
 */
function sortByName(nodes: readonly AgentNode[]): readonly AgentNode[] {
	return [...nodes].sort((a, b) => a.name.localeCompare(b.name));
}
