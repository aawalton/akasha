import type { Asking } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { runMechanicalChange } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { DATA } from "akasha/command/modules/answering/command-answering.module.code.ts"
import {
  composedFor,
  type Naming,
} from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"
import {
  putting,
  taking,
} from "akasha/page/service/modules/page-putting/page-putting.module.code.ts"

export type Wrote =
  | { readonly landed: readonly string[]; readonly wrong: readonly string[] }
  | { readonly refused: string; readonly code: number }

export type Writing = (done: string[], named: Naming, message: string) => Promise<Wrote>

export function writingIn(root: string): Writing {
  return async (done: string[], named: Naming, message: string): Promise<Wrote> => {
    const composed = composedFor(root, named)
    if ("refused" in composed) return { refused: composed.refused, code: DATA }
    const asked: Asking[] = [putting(composed.put), ...composed.parts.map(putting)]
    for (const gone of composed.removes) asked.push(taking(gone))
    const landed = await runMechanicalChange(root, asked, message, { done })
    if ("refusals" in landed) return { refused: landed.refusals.join(" "), code: landed.code }
    return { landed: landed.landed, wrong: landed.wrong }
  }
}
