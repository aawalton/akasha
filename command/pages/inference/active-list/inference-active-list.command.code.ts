import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import {
  answering,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { inferenceActiveList as page } from "akasha/command/pages/inference/active-list/inference-active-list.command.ts"
import {
  copActive,
  findCop,
} from "akasha/infrastructure/inference/pool/modules/cop-admin/cop-admin.module.code.ts"

export async function inferenceActiveList(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [])
  if ("refused" in read) return refusedBy(read.refused)

  return await answering(async () => told([...(await copActive(findCop()))]))
}
