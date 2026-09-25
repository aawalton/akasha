import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { poolService } from "akasha/command/argument/pages/pool-service.argument.ts"
import {
  answering,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { inferenceActivate as page } from "akasha/command/pages/inference/activate/inference-activate.command.ts"
import {
  copActivate,
  findCop,
} from "akasha/infrastructure/inference/pool/modules/cop-admin/cop-admin.module.code.ts"

type Residing = (done: string[], name: string) => Promise<Answer>

async function resided(done: string[], name: string): Promise<Answer> {
  const cop = findCop()
  if (!cop.poolNames.includes(name)) {
    return refusedBy([
      `\`${name}\` is no pool service — the pool carries ${cop.poolNames.join(", ")}`,
    ])
  }
  const resident = await copActivate(done, cop, name)
  return told([`resident\t${resident.join(", ")}`])
}

export async function inferenceActivate(
  argv: readonly string[],
  given: Given,
  residing: Residing = resided
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [poolService])
  if ("refused" in read) return refusedBy(read.refused)

  return await answering(async (done) => await residing(done, read.taken.poolService))
}
