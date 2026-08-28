/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { PALETTE_NAMES } from '../palette.ts';

/**
 * What a seat's turn state draws as, kept apart from the tree so it can be exercised.
 *
 * WHICH COLOUR A STATE TAKES IS NOT DECIDED HERE and must not be. That stands on the state's own
 * domain in the instructions repository, one `colour-slug` line apiece, and reaches this panel as
 * a colour NAME on the row. What is here is the other half: what this editor's palette calls that
 * name. A hex on either side of the boundary would put the palette in the corpus or the decision
 * in the panel.
 *
 * WHICH NAMES THERE ARE IS NOT DECIDED HERE EITHER, and that is the newer half. This file kept a
 * hand-spelled three while `../palette` declared six, so a state the corpus drew in one of the
 * other three would have painted the tab strip and left these rows at the default. It reads the
 * palette now, and the manifest contributes an id for every name in it.
 */

/** A scheme of its own per panel, so one provider never answers for another panel's rows. */
export const TURN_SCHEME_PATH = 'turn';

/**
 * The prefix every colour id this extension contributes carries, spelled once.
 *
 * The manifest and this file are joined by bare strings and nothing typechecks the join, so the
 * prefix stands here and the test that reads the manifest off disk takes it from here too.
 */
export const COLOUR_ID_PREFIX = 'ops.color.';

/**
 * The theme colour id a `/turn/<colour>/<id>` or `/subagent/<colour>/<id>` path asks for, or
 * undefined for every other path.
 *
 * TWO PREFIXES ANSWER HERE because a subagent is an agent taking a turn, drawn in the colour of
 * the state it is in, exactly as a seat is. They part on the BADGE rather than on the colour —
 * a subagent's row still says which of the two it is — so the badge is read off the prefix by
 * the provider and the colour is read off both.
 *
 * A SUBAGENT PATH CARRYING NO COLOUR is not a match, and the two forms cannot be confused: the
 * colour is only ever read where a segment follows it, so `/subagent/<id>` falls through to the
 * muted draw a subagent had before it had a state.
 *
 * A NAME IS NOT TRUSTED INTO AN ID UNCHECKED. A `ThemeColor` naming something the manifest does
 * not contribute paints nothing and reports nothing, so a row would draw at the default and look
 * exactly like a row with no state at all. Matching against the palette still draws an unknown
 * name at the default — but knowably, and one test away.
 */
export function turnColourIn(path: string): string | undefined {
	const found = /^\/(?:turn|subagent)\/([a-z-]+)\//.exec(path);
	if (found === null) { return undefined; }
	const name = found[1] ?? '';
	return PALETTE_NAMES.has(name) ? `${COLOUR_ID_PREFIX}${name}` : undefined;
}

/**
 * What a seat's row says about its turn, or undefined where it says nothing.
 *
 * A waiting seat names what it waits on, because that is the whole of what waiting adds over
 * being stopped: both are idle, and only one of them has something coming. `unknown` says
 * nothing rather than saying "unknown", a seat too new to have recorded anything not being a
 * state Alan has to read.
 */
export function turnStateSaid(state: string | undefined, waitingOn: string | undefined): string | undefined {
	if (state === undefined || state === 'unknown') { return undefined; }
	return waitingOn === undefined ? state : `${state} on ${waitingOn}`;
}
