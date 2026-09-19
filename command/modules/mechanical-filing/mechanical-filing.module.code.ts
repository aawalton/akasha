import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { addFileOfAnyKind } from "akasha/change/mechanical/file/add/add-file-of-any-kind/add-file-of-any-kind.change-mechanical.ts"
import { changeMechanicalFile } from "akasha/change/mechanical/file/change-mechanical-file.page-type.ts"
import { removeFile } from "akasha/change/mechanical/file/remove/remove-file/remove-file.change-mechanical-file.ts"
import type { FileChange } from "akasha/change/modules/answer/change-answer.module.types.ts"
import type {
  Asking,
  Landing,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import {
  MECHANICAL_KIND,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import {
  answeredWith,
  answering,
  naming,
  OPERATIONAL,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { builtIn } from "akasha/command/modules/file-arguing/file-arguing.module.code.ts"
import { commitSaid } from "akasha/command/modules/landing-saying/landing-saying.module.code.ts"
import type { Piping } from "akasha/command/modules/piping/piping.module.code.ts"

const PUT = `${changeMechanical.slug}/${addFileOfAnyKind.slug}` as const

const TAKE = `${changeMechanicalFile.slug}/${removeFile.slug}` as const

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

async function filed(
  done: string[],
  argv: readonly string[],
  given: Given,
  piping: Piping,
  landing: Landing
): Promise<Answer> {
  const built = builtIn(argv, given, piping, MECHANICAL_KIND)
  if ("code" in built) return built
  const landed = await landing(given.root, askedFor(built.changes), built.message, { done })
  if ("refusals" in landed)
    return answeredWith([...(landed.said ?? [])], landed.refusals, landed.code)
  const wrote = [
    ...landed.landed.map((one) => `landed ${one}`),
    ...landed.said,
    commitSaid(landed.commit, landed.untracked ?? []),
  ]
  return answeredWith(wrote, landed.wrong, landed.wrong.length === 0 ? 0 : OPERATIONAL)
}

export async function filing(
  argv: readonly string[],
  given: Given,
  piping: Piping,
  landing: Landing = runMechanicalChange
): Promise<Answer> {
  return await answering(async (done) =>
    naming(done, await filed(done, argv, given, piping, landing))
  )
}
