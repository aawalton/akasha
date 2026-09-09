import { copActive, findCop } from "akasha/inference/pool/cop-admin/cop-admin.module.code.ts"
import {
  wasRefused,
  wordsIn,
} from "../../../../inference/commands/inference-answering/inference-answering.module.code.ts"
import {
  answering,
  refusedBy,
  told,
} from "../../../modules/answering/command-answering.module.code.ts"
import type { Answer } from "../../../modules/calling/calling.module.code.ts"

export async function inferenceActive(argv: readonly string[]): Promise<Answer> {
  const said = wordsIn(argv, [], [])
  if (wasRefused(said)) return refusedBy(said.refused)
  if (said.loose.length > 0) {
    return refusedBy([`\`${said.loose[0]}\` follows nothing this takes — it takes nothing`])
  }

  return await answering(async () => told([...(await copActive(findCop()))]))
}
