import { pathsOf } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type { FileChange } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import type { Asking } from "akasha/changes/runners/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { runMechanicalChange } from "akasha/changes/runners/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import {
  answeredWith,
  keeping,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Applied } from "akasha/commands/modules/applying/applying.module.code.ts"
import type { Answer } from "akasha/commands/modules/calling/calling.module.code.ts"
import { commitSaid } from "akasha/commands/modules/landing-saying/landing-saying.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { namesDrawn } from "akasha/utils/text/name-drawing/name-drawing.module.code.ts"

export const DAYS_AT = "alan/track/daily/days/pages/"

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
  const under = namesDrawn(TRACKED_AT, " or ")
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
    if (one.kind === "move" || one.kind === "append" || one.kind === "bring") continue
    if (one.kind === "remove") asked.push(changeAt(one.path, null))
    else asked.push(changeAt(one.path, one.kind === "add" ? one.content : one.contentTo))
  }
  return asked
}

export type Landing = (
  root: string,
  changes: readonly Asking[],
  message: string
) => ReturnType<typeof runMechanicalChange>

export function wroteIn(landed: Applied): readonly string[] {
  return [
    ...landed.landed.map((one) => `landed ${one}`),
    ...landed.said,
    commitSaid(landed.commit, landed.untracked ?? []),
  ]
}

export async function landingTracked(
  done: string[],
  root: string,
  changes: readonly FileChange[],
  message: string
): Promise<Answer> {
  const stray = strayAmong(changes.flatMap(pathsOf))
  if (stray.length > 0) return mistaking(stray)
  const landed = await runMechanicalChange(root, askedFor(changes), message, null, { done })
  if ("refusals" in landed) {
    return keeping(done, answeredWith([...(landed.said ?? [])], landed.refusals, WRONG))
  }
  const wrote = wroteIn(landed)
  return answeredWith(wrote, landed.wrong, landed.wrong.length === 0 ? 0 : WRONG)
}

export type TrackingAsked = {
  readonly root: string
  readonly changes: readonly TrackingChange[]
  readonly message: string
}

export type TrackingLanded =
  | { readonly landed: true; readonly report: readonly string[] }
  | { readonly refused: string }

export async function landTracking(
  asked: TrackingAsked,
  landing: Landing = runMechanicalChange
): Promise<TrackingLanded> {
  if (asked.changes.length === 0) return { refused: NOTHING }
  const stray = strayAmong(asked.changes.map((one) => one.path))
  if (stray.length > 0) return { refused: stray.join("\n") }
  const named = asked.changes.map((one) => changeAt(one.path, one.body))
  const landed = await landing(asked.root, named, asked.message)
  if ("refusals" in landed) return { refused: landed.refusals.join("\n") }
  const wrote = wroteIn(landed)
  if (landed.wrong.length > 0) return { refused: [...landed.wrong, ...wrote].join("\n") }
  return { landed: true, report: wrote }
}
