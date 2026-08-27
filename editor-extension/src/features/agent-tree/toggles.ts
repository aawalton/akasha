/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { z } from 'zod';
import type { SeatMode } from '../../seat/mode';
import { askHarness } from './harness';

/**
 * The two things a row says about a seat, and the two a toggle changes: where it
 * runs, and whether it runs.
 *
 * They are ONE MECHANISM AND TWO QUESTIONS. Every act below kills a process and
 * resumes the bound session somewhere, so the verbs invite a single destination
 * picker — but Alan asked for two toggles because that is how he thinks about a
 * seat, and the interface serves his head rather than the mechanism.
 */
export interface SeatToggleState {
	/** Whether a seat is in the live listing — `active`, `paused` or `running`. */
	readonly running: boolean;
	/** Where the seat runs, which a STOPPED seat still has. */
	readonly place: SeatMode;
}

/**
 * One act in a toggle's plan. A plan is ordered and each step runs only if the one
 * before it succeeded.
 */
export type SeatStep =
	/** `ops seat stop` — SIGTERM the supervisor, escalating to SIGKILL. */
	| { readonly kind: 'stop' }
	/**
	 * `ops seat resume --prompt` — a detached headless supervisor resuming the
	 * bound session, DRIVEN. Never bare: see `resumePrompt`.
	 */
	| { readonly kind: 'revive' }
	/**
	 * `ops seat resume --start-mode interactive`, then a terminal attaching to the
	 * session it launched.
	 *
	 * TWO ACTS, AND NO SHELL BETWEEN THEM. The resume is an `ops` call like every
	 * other step here, and the terminal runs `tmux attach-session` and nothing else.
	 * What the seat is bound to is settled by `ops`; the terminal is a window onto
	 * a session that is already running, so closing it leaves the seat standing.
	 *
	 * `ops seat resume` takes a live holder over itself, stopping it first, so no
	 * `stop` step precedes this — an explicit one would race that.
	 */
	| { readonly kind: 'resume-interactive' }
	/** `ops seat set --agent <id> --mode <place>` — state the place, start nothing. */
	| { readonly kind: 'state-place'; readonly place: SeatMode }
	/**
	 * A terminal in this window attaching to the seat's tmux session.
	 *
	 * IT TOUCHES NO PROCESS. The agent is working in the session whether or not
	 * anything is attached, so this gives Alan a window onto it and costs the seat
	 * nothing.
	 */
	| { readonly kind: 'attach' }
	/**
	 * Closing the terminal in this window attached to the seat's session.
	 *
	 * The tmux client goes and the session stays, so the agent works on with nobody
	 * watching. This is what makes a seat headless: not a different process, the
	 * same one with no terminal on it.
	 */
	| { readonly kind: 'detach' }
	/**
	 * `ops seat reset` — the seat stopped and started again with a NEW agent in it,
	 * under the same name and the same declarations.
	 *
	 * IT IS NOT A RESTART. A resume brings the same agent back on the session it was
	 * bound to; this replaces the agent, which is what `pages/page-type/agent.md`
	 * means by a reset making a new one. Everything the old agent remembered goes
	 * with it, so this is the only step here that destroys something a stopped seat
	 * still has.
	 */
	| { readonly kind: 'reset' };

/**
 * What the RUN toggle does. It changes whether the seat runs and never where.
 *
 * Bringing a seat back reads the place rather than choosing one, which is what
 * makes the two toggles compose without merging: the run toggle asks the place
 * toggle where to land and does not offer its own answer.
 */
export function planRunToggle(state: SeatToggleState): readonly SeatStep[] {
	if (state.running) { return [{ kind: 'stop' }]; }
	return state.place === 'interactive' ? [{ kind: 'resume-interactive' }] : [{ kind: 'revive' }];
}

/**
 * What the PLACE toggle does. It moves the seat to the other place and never
 * changes whether it runs, nor which agent is in it.
 *
 * IT ATTACHES AND DETACHES RATHER THAN RESTARTING. A seat is a tmux session and the
 * agent works inside it whether or not a terminal is attached, so where a seat runs
 * is a question about terminals rather than about processes. This used to stop the
 * seat and bring it back on the other side, which replaced a running agent every
 * time Alan wanted to look at one — the turn in progress was lost to a toggle that
 * only promised to move it.
 *
 * A STOPPED SEAT STILL HAS A PLACE, so this is not greyed out for one. There it
 * states the destination the run toggle will later bring the seat back to and
 * starts nothing: a stopped seat has no session to attach to.
 *
 * THE PLACE IS STATED FIRST. Both launch paths write the mode themselves on the way
 * up, so the write is redundant on the happy path and is made anyway: it means the
 * toggle's effect is this plan's rather than a side effect of somebody else's
 * launch, and a plan whose later step fails still leaves the seat reading where Alan
 * put it.
 */
export function planPlaceToggle(state: SeatToggleState): readonly SeatStep[] {
	const place: SeatMode = state.place === 'interactive' ? 'headless' : 'interactive';
	const stated: SeatStep = { kind: 'state-place', place };
	if (!state.running) { return [stated]; }
	return place === 'interactive' ? [stated, { kind: 'attach' }] : [stated, { kind: 'detach' }];
}


/**
 * What RESET does. It replaces the agent and leaves the seat where it was.
 *
 * IT IS OFFERED ON EVERY SEAT ROW, running or stopped, because a stopped seat
 * still holds an agent's memory and replacing it is exactly what Alan reaches for
 * when that memory has gone wrong.
 *
 * AN INTERACTIVE SEAT IS ATTACHED TO AFTERWARDS. `ops seat reset` starts the new
 * agent detached under the seat's own name, on the same reasoning the resume path
 * follows, so the terminal here does nothing but attach to what is already
 * running. A headless seat wants no terminal and gets none.
 */
export function planReset(state: SeatToggleState): readonly SeatStep[] {
	const reset: SeatStep = { kind: 'reset' };
	return state.place === 'interactive' ? [reset, { kind: 'attach' }] : [reset];
}

/**
 * The first turn a revived seat RUNS, passed to `ops seat resume --prompt`.
 *
 * WITHOUT IT THE ROW LIES. A bare revive resumes idle by design — a warm seat
 * waiting on its mailbox. `--resume` on an empty prompt drives nothing, Claude Code
 * fills the void with its own `Continue from where you left off.`, the model answers
 * the synthetic `No response requested.`, and the seat sits there. Measured on a
 * throwaway seat: a bare revive flipped the row to running and added exactly those
 * two lines and nothing else. The row reads running over a seat that will never
 * touch its project again, which is the failure that looks like success.
 *
 * IT NAMES NO ASSIGNMENT, and that is deliberate. An errand is stated nowhere — no
 * store key carries one and no sweep can see one — but it lives in the conversation
 * this revive resumes, so it comes back in the seat's own context. Nothing outside
 * the seat can read it. A caller that inspected the store to decide what to hand
 * back would therefore drop exactly the assignment the store cannot show. The seat
 * is the only party that can see its store, its conversation and its project row at
 * once, so it is asked, and it answers for all five kinds at once. Measured: the
 * revived seat reported its stated initiative AND the unstated errand its spawner
 * had given it.
 *
 * A SEAT HOLDING NOTHING COMES BACK HOLDING NOTHING, which is idle and correct.
 *
 * THE WORDS ARE NOT HERE ANY MORE. They are authored at `notices/resume.md` in the
 * instructions repository, under `editor-revive`, and fetched fresh on every click.
 * A seat reads this as an ordinary turn and acts on it, which makes it a document
 * that binds a seat; priced as a constant in this extension, changing a word of it
 * cost a branch, a pipeline, a package build and a reinstall of the extension.
 */
const EditorReviveZ = z.object({ 'editor-revive': z.string().min(1) });

/**
 * What the revived seat is told, from the tree that authors it.
 *
 * IT THROWS RATHER THAN FALLING BACK, which is the whole of its failure doctrine and
 * the opposite of the supervisor's. Alan is at the keyboard when this runs — it is
 * his click — so the caller shows him the reason and the revive does not happen. A
 * seat revived with a default prompt would be a seat told something nobody wrote,
 * and one revived bare comes back idle, which reads as the seat having nothing to do
 * rather than as a failure anybody saw.
 *
 * NEVER CACHED. A cache would hold the words this editor window started with, so an
 * edit would reach seats only as Alan restarted his editor.
 */
export async function resumePrompt(): Promise<string> {
	const answer = await askHarness('compose-notices');
	return EditorReviveZ.parse(answer)['editor-revive'];
}

/**
 * The shape a seat name has, and the boundary the resume path refuses at.
 *
 * THE ALPHABET IS THE CORPUS'S OWN. Every family the harness declares a seat name in spells it in
 * lower-case letters, digits and hyphens — `alan-handler`, `17597-memory-developer`,
 * `deliver-17320-2`, `awen-game-master--the-tower` are the specimens it carries — so a name
 * outside this alphabet is not a seat name needing careful handling but one nothing composed.
 *
 * A DIGIT LEADS AS READILY AS A LETTER. A seat holding a project number spells that number first,
 * and a domain slug may itself begin with a digit, so `17597-memory-developer` and `3055-worker`
 * are ordinary names rather than edge cases.
 *
 * A HYPHEN MAY NOT LEAD, which is the one position that carries a meaning of its own. `tmux` reads
 * a leading hyphen as an option wherever it stands, so a name opening with one would be taken as a
 * flag to `attach-session` rather than as the session to attach to.
 */
const SEAT_NAME_RE = /^[a-z0-9][a-z0-9-]*$/;

/** What the guard requires, in the words the refusal shows Alan. */
const SEAT_NAME_REQUIREMENT =
	'a seat name is lower-case letters, digits and hyphens, opening with a letter or a digit';

/** Whether tmux can be handed this name as the session to attach to. */
export function seatNameAccepted(name: string): boolean {
	return SEAT_NAME_RE.test(name);
}

/**
 * The line an attaching terminal is handed, or a throw naming what the name would have to be.
 *
 * IT ATTACHES AND STARTS NOTHING. The seat is already running when this is sent — `ops seat
 * resume` launched it detached under this name — so a terminal carrying this line is a window
 * onto a session rather than the thing that brought it back.
 *
 * THE NAME IS ANCHORED AS WELL AS QUOTED. `=` makes tmux match the session name exactly, so a
 * name that is a prefix of another cannot attach to its neighbour; the quoting keeps the alphabet
 * above a second line of defence rather than the only thing between a name and the shell.
 *
 * IT THROWS RATHER THAN ANSWERING A LINE IT CANNOT VOUCH FOR. The caller asks for the line before
 * it opens a terminal, so a refused name leaves no terminal standing with nothing running in it.
 */
export function attachCommandLine(name: string): string {
	if (!seatNameAccepted(name)) {
		throw new Error(`${JSON.stringify(name)} is not a seat name: ${SEAT_NAME_REQUIREMENT}`);
	}
	return `tmux attach-session -t "=${name}"`;
}

/**
 * What a SEAT row spells for the `when` clauses behind the two toggles.
 *
 * BOTH AXES, INDEPENDENTLY READABLE. Each toggle's clause matches one axis of this
 * string and ignores the other, which is what lets the two be offered separately
 * over one row rather than as four combined states. A stopped seat still spells its
 * place, so its place toggle is offered rather than greyed out.
 *
 * A SUBAGENT ROW NEVER SPELLS THIS. It is not a seat: `ops seat stop` does not
 * address one, and there is no session to resume it on. Every clause here is
 * anchored on the `seat.` prefix, so a subagent's own context value carries no
 * toggle at all rather than carrying one that would fail when clicked.
 *
 * Exported because the clauses that read it live in `package.json`, where nothing
 * typechecks them against this — so the suite matches the shipped clauses against
 * the shipped values here, and a toggle that would never appear fails a test rather
 * than going quiet in the interface.
 */
export function seatContextValue(live: boolean, place: SeatMode): string {
	return `seat.${live ? 'running' : 'stopped'}.${place}`;
}
