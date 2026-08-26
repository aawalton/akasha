/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * The names this panel is known by in `package.json` and in the workbench, and the two intervals
 * its sweep runs on.
 *
 * HELD APART FROM THE CODE THAT USES THEM SO THEY CAN BE CHECKED, as the Work panel beside this one
 * holds its own. A view id and a command id are matched by string between the manifest and the
 * extension, and NOTHING TYPECHECKS THAT MATCH. Get one wrong and there is no build error and no
 * exception: the panel is simply empty, or a menu entry is simply absent.
 */

export const VIEW_ID = 'opsAgentTree';
export const REFRESH_COMMAND = 'opsAgentTree.refreshNow';
export const PLACE_INTERACTIVE_COMMAND = 'opsAgentTree.placeInteractive';
export const PLACE_HEADLESS_COMMAND = 'opsAgentTree.placeHeadless';
export const RUN_STOP_COMMAND = 'opsAgentTree.runStop';
export const RUN_RESUME_COMMAND = 'opsAgentTree.runResume';
export const RUN_RESET_COMMAND = 'opsAgentTree.runReset';
export const COPY_SEAT_NAME_COMMAND = 'opsAgentTree.copySeatName';

/**
 * Seats turn over on the order of minutes — a seat is spawned, works and stops —
 * so a slower tick than the status bar's costs nothing in how live the tree
 * feels and spends far less on a query nobody is watching change.
 */
export const POLL_INTERVAL_MS = 10_000;

/**
 * How long a burst of seat stamps is allowed to settle before the tree is re-read.
 *
 * THE STRIP HAS NO SETTLE OF ITS OWN and wants none: it answers each event straight away
 * because its read is a handful of file reads. This one spawns a process and republishes
 * every tab's keys, so it coalesces instead — which leaves the panel trailing the strip by
 * up to this long. That is deliberate and is chosen to sit under what anybody can see as the
 * two disagreeing; what could be seen was the ten-second interval this replaced.
 *
 * SET BY THE BUDGET SINCE 2026-08-22, WHERE IT WAS 250ms BEFORE. A turn state changing is drawn
 * within 100ms, and this wait is spent before the read rather than during it, so the span it
 * stood at lost the bound before this panel asked the harness anything. The two commands it
 * spawns cost about 50ms between them, which leaves the rest of the budget for them to sit in.
 *
 * THIS PANEL HAS THE LEAST ROOM OF THE THREE, because a seat write re-reads its whole tree where
 * the Work panel beside it asks only for the colours. Where that stops fitting, the answer is to
 * split the repaint from the re-read as that panel did, rather than to wait longer here.
 */
export const SEAT_SETTLE_MS = 25;
