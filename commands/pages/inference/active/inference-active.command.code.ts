import {
  answering,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  wasRefused,
  wordsIn,
} from "akasha/infrastructure/inference/commands/inference-answering/inference-answering.module.code.ts"
import {
  copActive,
  findCop,
} from "akasha/infrastructure/inference/pool/cop-admin/cop-admin.module.code.ts"

export async function inferenceActive(argv: readonly string[]): Promise<Answer> {
  const said = wordsIn(argv, [], [])
  if (wasRefused(said)) return refusedBy(said.refused)
  if (said.loose.length > 0) {
    return refusedBy([`\`${said.loose[0]}\` follows nothing this takes — it takes nothing`])
  }

  return await answering(async () => told([...(await copActive(findCop()))]))
}
