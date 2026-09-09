import type { Asking } from "@akasha/changes/mechanical-change-running"
import { runMechanicalChange } from "@akasha/changes/mechanical-change-running"
import { notUtf8 } from "@akasha/checks/body-not-utf8"
import { decodeUtf8 } from "@akasha/code/utf8-body"
import { mistaking } from "../../../command-system/asking/asking.module.code.ts"
import {
  type Answer,
  answering,
  type Given,
} from "../../../command-system/calling/calling.module.code.ts"
import type { FileEdit } from "../../../command-system/landing/landing.module.code.ts"
import type { Piping } from "../../../command-system/piping/piping.module.code.ts"
import { builtIn } from "../file-arguing/file-arguing.module.code.ts"

const PUT = "change-mechanical/add-file-of-any-kind"

const TAKE = "change-mechanical-file/remove-file"

const WRONG = 3

export type Asked = { readonly asked: readonly Asking[] } | { readonly wrong: readonly string[] }

export function askedFor(changes: readonly FileEdit[]): Asked {
  const asked: Asking[] = []
  const wrong: string[] = []
  for (const one of changes) {
    if (one.body === null) {
      asked.push({ at: TAKE, given: { at: one.path } })
      continue
    }
    const body = decodeUtf8(one.body)
    if (body === null) wrong.push(notUtf8(one.path, one.body))
    else asked.push({ at: PUT, given: { at: one.path, body } })
  }
  return wrong.length > 0 ? { wrong } : { asked }
}

export async function filing(
  argv: readonly string[],
  given: Given,
  piping: Piping
): Promise<Answer> {
  const built = builtIn(argv, given, piping)
  if ("code" in built) return built
  const asked = askedFor(built.changes)
  if ("wrong" in asked) return mistaking(asked.wrong)
  const landed = await runMechanicalChange(given.root, asked.asked, built.message)
  if ("refusals" in landed) return answering([], landed.refusals, WRONG)
  return answering(landed.said, landed.wrong, landed.wrong.length === 0 ? 0 : WRONG)
}
