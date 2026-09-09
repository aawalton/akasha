import type { Asking } from "@akasha/changes/mechanical-change-running"
import { runMechanicalChange } from "@akasha/changes/mechanical-change-running"
import { decodeUtf8 } from "@akasha/code/utf8-body"
import { notUtf8 } from "akasha/checks/modules/body-not-utf8/body-not-utf8.module.code.ts"
import { mistaking } from "../../../commands/modules/asking/asking.module.code.ts"
import { type Answer, answering } from "../../../commands/modules/calling/calling.module.code.ts"
import type { FileEdit } from "../../../commands/modules/landing/landing.module.code.ts"

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

export type Asked = { readonly asked: readonly Asking[] } | { readonly wrong: readonly string[] }

export function askedFor(changes: readonly FileEdit[]): Asked {
  const asked: Asking[] = []
  const wrong: string[] = []
  for (const one of changes) {
    if (one.body === null) {
      asked.push(changeAt(one.path, null))
      continue
    }
    const body = decodeUtf8(one.body)
    if (body === null) wrong.push(notUtf8(one.path, one.body))
    else asked.push(changeAt(one.path, body))
  }
  return wrong.length > 0 ? { wrong } : { asked }
}

export async function landingTracked(
  root: string,
  changes: readonly FileEdit[],
  message: string
): Promise<Answer> {
  const stray = strayAmong(changes.map((one) => one.path))
  if (stray.length > 0) return mistaking(stray)
  const asked = askedFor(changes)
  if ("wrong" in asked) return mistaking(asked.wrong)
  const landed = await runMechanicalChange(root, asked.asked, message)
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
