import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { addFileOfAnyKind } from "akasha/change/mechanical/file/add/add-file-of-any-kind/add-file-of-any-kind.change-mechanical.ts"
import { changeMechanicalFile } from "akasha/change/mechanical/file/change-mechanical-file.page-type.ts"
import { removeFile } from "akasha/change/mechanical/file/remove/remove-file/remove-file.change-mechanical-file.ts"
import type {
  Asking,
  Landing,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { runMechanicalChange } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { partWay } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Applied } from "akasha/command/modules/applying/applying.module.code.ts"
import { whyOf } from "akasha/command/modules/fault-saying/fault-saying.module.code.ts"
import type { Refused } from "akasha/command/modules/landing/landing.module.code.ts"
import { commitSaid } from "akasha/command/modules/landing-saying/landing-saying.module.code.ts"
import { namesDrawn } from "akasha/text/writing/modules/name-drawing/name-drawing.module.code.ts"

export const DAYS_AT = "alan/track/daily/day/pages/"

export const FOOD_ENTRIES_AT = "alan/track/food-entry/pages/"

const TRACKED_AT: readonly string[] = [DAYS_AT, FOOD_ENTRIES_AT]

const PUT = `${changeMechanical.slug}/${addFileOfAnyKind.slug}` as const

const TAKE = `${changeMechanicalFile.slug}/${removeFile.slug}` as const

const NOTHING = "nothing was composed to land"

function under(path: string, trees: readonly string[]): boolean {
  return trees.some((one) => path.startsWith(one))
}

function outside(said: string, trees: readonly string[]): string {
  const held = namesDrawn(trees, " or ")
  return `${said} is not under ${held}, and this lands what Alan's tracking composes and nothing else`
}

function strayUnder(paths: readonly string[], trees: readonly string[]): readonly string[] {
  return paths.filter((one) => !under(one, trees)).map((one) => outside(one, trees))
}

export type TrackingChange = {
  readonly path: string
  readonly body: string | null
}

function changeAt(path: string, body: string | null): Asking {
  if (body === null) return { at: TAKE, given: { at: path } }
  return { at: PUT, given: { at: path, body } }
}

function wroteIn(landed: Applied): readonly string[] {
  return [
    ...landed.landed.map((one) => `landed ${one}`),
    ...landed.said,
    commitSaid(landed.commit, landed.untracked ?? []),
  ]
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
  done: string[] = [],
  landing: Landing = runMechanicalChange
): Promise<TrackingLanded> {
  if (asked.changes.length === 0) return { refused: NOTHING }
  const stray = strayUnder(
    asked.changes.map((one) => one.path),
    TRACKED_AT
  )
  if (stray.length > 0) return { refused: stray.join("\n") }
  const named = asked.changes.map((one) => changeAt(one.path, one.body))
  let landed: Applied | Refused
  try {
    landed = await landing(asked.root, named, asked.message, { done })
  } catch (thrown) {
    return { refused: [whyOf(thrown), ...partWay(done)].join("\n") }
  }
  if ("refusals" in landed) return { refused: landed.refusals.join("\n") }
  const wrote = wroteIn(landed)
  if (landed.wrong.length > 0) return { refused: [...landed.wrong, ...wrote].join("\n") }
  return { landed: true, report: wrote }
}
