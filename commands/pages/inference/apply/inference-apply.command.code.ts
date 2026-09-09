import type { Answer } from "@akasha/command-system/calling"
import { codeRoot } from "@akasha/pages/code-root"
import { reconcile } from "akasha/inference/pool/inference-reconcile/inference-reconcile.module.code.ts"
import {
  keyedLines,
  wasRefused,
  wordsIn,
} from "../../../../inference/commands/inference-answering/inference-answering.module.code.ts"
import {
  answering,
  refusedBy,
  told,
} from "../../../modules/command-answering/command-answering.module.code.ts"

export async function inferenceApply(argv: readonly string[]): Promise<Answer> {
  const said = wordsIn(argv, [], [])
  if (wasRefused(said)) return refusedBy(said.refused)
  if (said.loose.length > 0) {
    return refusedBy([`\`${said.loose[0]}\` follows nothing this takes — it takes nothing`])
  }

  return await answering(async () => {
    const summary = await reconcile({ workspace: codeRoot(), dryRun: false })
    return told(
      keyedLines([
        ["applied", summary.applied],
        ["skipped", summary.skipped],
        ["pruned", summary.pruned],
      ])
    )
  })
}
