import { pathsOf } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type { FileChange } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import type { Asking } from "akasha/changes/runners/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { runMechanicalChange } from "akasha/changes/runners/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { mistaking } from "../../../commands/modules/asking/asking.module.code.ts"
import { type Answer, answering } from "../../../commands/modules/calling/calling.module.code.ts"

export const DAYS_AT = "alan/track/days/pages/"

export const FOOD_ENTRIES_AT = "alan/track/food-entries/pages/"

export const TRACKED_AT: readonly string[] = [DAYS_AT, FOOD_ENTRIES_AT]

const PUT = "change-mechanical/add-file-of-any-kind"

const TAKE = "change-mechanical-file/remove-file"

const NOTHING = "nothing was composed to land"

const WRONG = 3

export function trackedIn(path: string | null): boolean {
  return path !== null && TRACKED_AT.some((one) => path.startsWith(one))
}

export function outsideTracked(said: string): string {
  const under = TRACKED_AT.map((one) => `\`${one}\``).join(" or ")
  return `${said} is not under ${under}, and this lands what Alan's tracking composes and nothing else`
}

export function strayAmong(paths: readonly string[]): readonly string[] {
  return paths.filter((one) => !trackedIn(one)).map((one) => outsideTracked(one))
}

export type TrackingChange = {
  readonly path: string
  readonly body: string | null
}

function changeAt(path: string, body: string | null): Asking {
  if (body === null) return { at: TAKE, given: { at: path } }
  return { at: PUT, given: { at: path, body } }
}

export function askedFor(changes: readonly FileChange[]): readonly Asking[] {
  const asked: Asking[] = []
  for (const one of changes) {
    if (one.kind === "move") continue
    if (one.kind === "remove") asked.push(changeAt(one.path, null))
    else asked.push(changeAt(one.path, one.kind === "add" ? one.content : one.contentTo))
  }
  return asked
}

export async function landingTracked(
  root: string,
  changes: readonly FileChange[],
  message: string
): Promise<Answer> {
  const stray = strayAmong(changes.flatMap(pathsOf))
  if (stray.length > 0) return mistaking(stray)
  const landed = await runMechanicalChange(root, askedFor(changes), message)
  if ("refusals" in landed) return answering([], landed.refusals, WRONG)
  return answering(landed.said, landed.wrong, landed.wrong.length === 0 ? 0 : WRONG)
}

export type TrackingAsked = {
  readonly root: string
  readonly changes: readonly TrackingChange[]
  readonly message: string
}

export type TrackingLanded =
  | { readonly landed: true; readonly report: readonly string[] }
  | { readonly refused: string }

export async function landTracking(asked: TrackingAsked): Promise<TrackingLanded> {
  if (asked.changes.length === 0) return { refused: NOTHING }
  const stray = strayAmong(asked.changes.map((one) => one.path))
  if (stray.length > 0) return { refused: stray.join("\n") }
  const named = asked.changes.map((one) => changeAt(one.path, one.body))
  const landed = await runMechanicalChange(asked.root, named, asked.message)
  if ("refusals" in landed) return { refused: landed.refusals.join("\n") }
  if (landed.wrong.length > 0) return { refused: landed.wrong.join("\n") }
  return { landed: true, report: landed.said }
}
