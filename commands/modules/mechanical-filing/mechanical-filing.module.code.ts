import type { FileChange } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import type { Asking } from "akasha/changes/runners/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { runMechanicalChange } from "akasha/changes/runners/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { type Answer, answering, type Given } from "../calling/calling.module.code.ts"
import { builtIn } from "../file-arguing/file-arguing.module.code.ts"
import type { Piping } from "../piping/piping.module.code.ts"

const PUT = "change-mechanical/add-file-of-any-kind"

const TAKE = "change-mechanical-file/remove-file"

const WRONG = 3

export function askedFor(changes: readonly FileChange[]): readonly Asking[] {
  const asked: Asking[] = []
  for (const one of changes) {
    if (one.kind === "move") continue
    if (one.kind === "remove") asked.push({ at: TAKE, given: { at: one.path } })
    else {
      const body = one.kind === "add" ? one.content : one.contentTo
      asked.push({ at: PUT, given: { at: one.path, body } })
    }
  }
  return asked
}

export async function filing(
  argv: readonly string[],
  given: Given,
  piping: Piping
): Promise<Answer> {
  const built = builtIn(argv, given, piping)
  if ("code" in built) return built
  const landed = await runMechanicalChange(given.root, askedFor(built.changes), built.message)
  if ("refusals" in landed) return answering([], landed.refusals, WRONG)
  return answering(landed.said, landed.wrong, landed.wrong.length === 0 ? 0 : WRONG)
}
