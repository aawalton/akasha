import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { addFileOfAnyKind } from "akasha/change/mechanical/file/add/add-file-of-any-kind/add-file-of-any-kind.change-mechanical.ts"
import { removeFileOfAnyKind } from "akasha/change/mechanical/file/remove/remove-file-of-any-kind/remove-file-of-any-kind.change-mechanical.ts"
import type { Asking } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { runMechanicalChange } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { DATA } from "akasha/command/modules/answering/command-answering.module.code.ts"
import {
  composedFor,
  type Naming,
  type Put,
} from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"

const PUT = `${changeMechanical.slug}/${addFileOfAnyKind.slug}` as const

const TAKE = `${changeMechanical.slug}/${removeFileOfAnyKind.slug}` as const

export type Wrote =
  | { readonly landed: readonly string[]; readonly wrong: readonly string[] }
  | { readonly refused: string; readonly code: number }

export type Writing = (done: string[], named: Naming, message: string) => Promise<Wrote>

function putting(one: Put): Asking {
  return { at: PUT, given: { at: one.path, body: one.content } }
}

export function writingIn(root: string): Writing {
  return async (done: string[], named: Naming, message: string): Promise<Wrote> => {
    const composed = composedFor(root, named)
    if ("refused" in composed) return { refused: composed.refused, code: DATA }
    const asked: Asking[] = [putting(composed.put), ...composed.parts.map(putting)]
    for (const gone of composed.removes) asked.push({ at: TAKE, given: { at: gone } })
    const landed = await runMechanicalChange(root, asked, message, { done })
    if ("refusals" in landed) return { refused: landed.refusals.join(" "), code: landed.code }
    return { landed: landed.landed, wrong: landed.wrong }
  }
}
