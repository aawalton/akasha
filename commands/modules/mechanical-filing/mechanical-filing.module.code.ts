import type { FileChange } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import type { Asking } from "akasha/changes/runners/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import {
  MECHANICAL_KIND,
  runMechanicalChange,
} from "akasha/changes/runners/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { OPERATIONAL } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import {
  type Answer,
  answeredWith,
  type Given,
} from "akasha/commands/modules/calling/calling.module.code.ts"
import { builtIn } from "akasha/commands/modules/file-arguing/file-arguing.module.code.ts"
import { commitSaid } from "akasha/commands/modules/landing-saying/landing-saying.module.code.ts"
import type { Piping } from "akasha/commands/modules/piping/piping.module.code.ts"

const PUT = "change-mechanical/add-file-of-any-kind"

const TAKE = "change-mechanical-file/remove-file"

export function askedFor(changes: readonly FileChange[]): readonly Asking[] {
  const asked: Asking[] = []
  for (const one of changes) {
    if (one.kind === "move" || one.kind === "append" || one.kind === "bring") continue
    if (one.kind === "remove") asked.push({ at: TAKE, given: { at: one.path } })
    else {
      const body = one.kind === "add" ? one.content : one.contentTo
      asked.push({ at: PUT, given: { at: one.path, body } })
    }
  }
  return asked
}

export type Landing = (
  root: string,
  changes: readonly Asking[],
  message: string
) => ReturnType<typeof runMechanicalChange>

export async function filing(
  argv: readonly string[],
  given: Given,
  piping: Piping,
  landing: Landing = runMechanicalChange
): Promise<Answer> {
  const built = builtIn(argv, given, piping, MECHANICAL_KIND)
  if ("code" in built) return built
  const landed = await landing(given.root, askedFor(built.changes), built.message)
  if ("refusals" in landed)
    return answeredWith([...(landed.said ?? [])], landed.refusals, landed.code)
  const wrote = [
    ...landed.landed.map((one) => `landed ${one}`),
    ...landed.said,
    commitSaid(landed.commit, landed.untracked ?? []),
  ]
  return answeredWith(wrote, landed.wrong, landed.wrong.length === 0 ? 0 : OPERATIONAL)
}
