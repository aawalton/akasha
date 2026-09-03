import type { Answer } from "@akasha/command-system/calling"
import { copActive, findCop } from "@tools/lib/inference/cli/cop-admin"
import {
  answering,
  refusalIn,
  refusedBy,
  told,
  wordsIn,
} from "../inference-answering/inference-answering.module.code.ts"

export async function inferenceActive(argv: readonly string[]): Promise<Answer> {
  const said = wordsIn(argv, [], [])
  const saidRefused = refusalIn(said)
  if (saidRefused !== null) return refusedBy(saidRefused)
  if (said.loose.length > 0) {
    return refusedBy([`\`${said.loose[0]}\` follows nothing this takes — it takes nothing`])
  }

  return await answering(async () => told([...(await copActive(findCop()))]))
}
