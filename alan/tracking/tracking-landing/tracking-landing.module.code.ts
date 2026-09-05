/**
 * The landing every tracking write goes through, reached by importing it.
 *
 * A caller here already holds the composed body as a value, so nothing writes that body to a scratch
 * file for a second process to read back in. The `tracking` command is the argv shell over this: it
 * reads what was said on a command line and hands the same changes here.
 */

import { landedMechanically } from "@akasha/command-system/asking"
import type { Answer } from "@akasha/command-system/calling"
import type { FileEdit } from "@akasha/command-system/landing"

export const DAYS_AT = "alan/tracking/daily/wake-days/pages/"

export const FOOD_ENTRIES_AT = "alan/tracking/food-entries/pages/"

export const TRACKED_AT: readonly string[] = [DAYS_AT, FOOD_ENTRIES_AT]

const CALLED_AS = "akasha tracking"

const NOTHING = "nothing was composed to land"

export function trackedIn(path: string | null): boolean {
  return path !== null && TRACKED_AT.some((one) => path.startsWith(one))
}

export function outsideTracked(said: string): string {
  const under = TRACKED_AT.map((one) => `\`${one}\``).join(" or ")
  return `${said} is not under ${under}, and this lands what Alan's tracking composes and nothing else`
}

export function strayAmong(changes: readonly FileEdit[]): readonly string[] {
  return changes.filter((one) => !trackedIn(one.path)).map((one) => outsideTracked(one.path))
}

/**
 * Every change landed as one commit, under no agent id and owing no reading.
 *
 * A path outside the tracked trees is refused before anything is written, so a program composing the
 * wrong path takes nothing else down with it.
 */
export async function landingTracked(
  root: string,
  changes: readonly FileEdit[],
  message: string,
  calledAs: string = CALLED_AS
): Promise<Answer> {
  const stray = strayAmong(changes)
  if (stray.length > 0) return { report: [], refusals: stray, code: 1 }
  return await landedMechanically(root, calledAs, changes, message)
}

/** A body to land at a path, or nothing to take that path away. */
export type TrackingChange = {
  readonly path: string
  readonly body: string | Uint8Array | null
}

export type TrackingAsked = {
  readonly root: string
  readonly changes: readonly TrackingChange[]
  readonly message: string
}

export type TrackingLanded =
  | { readonly landed: true; readonly report: readonly string[] }
  | { readonly refused: string }

function editsIn(changes: readonly TrackingChange[]): readonly FileEdit[] {
  return changes.map((one) => ({
    path: one.path,
    body: typeof one.body === "string" ? new TextEncoder().encode(one.body) : one.body,
  }))
}

/**
 * What a program composed, landed under the tracked trees.
 *
 * A refusal is carried back rather than thrown, because the funnel above this answers for a day it
 * could not write and a caller that throws is answering for nothing.
 */
export async function landTracking(asked: TrackingAsked): Promise<TrackingLanded> {
  if (asked.changes.length === 0) return { refused: NOTHING }
  const said = await landingTracked(asked.root, editsIn(asked.changes), asked.message)
  if (said.code !== 0) return { refused: said.refusals.join("\n") }
  return { landed: true, report: said.report }
}
