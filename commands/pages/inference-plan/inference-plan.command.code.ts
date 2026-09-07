import type { Answer } from "@akasha/command-system/calling"
import { answering, refusedBy, told } from "@akasha/command-system/command-answering"
import { reconcile } from "@akasha/inference-pool/inference-reconcile"
import { codeRoot } from "@akasha/pages/code-root"
import {
  keyedLines,
  wasRefused,
  wordsIn,
} from "../../modules/inference-answering/inference-answering.module.code.ts"

export async function inferencePlan(argv: readonly string[]): Promise<Answer> {
  const said = wordsIn(argv, [], [])
  if (wasRefused(said)) return refusedBy(said.refused)
  if (said.loose.length > 0) {
    return refusedBy([`\`${said.loose[0]}\` follows nothing this takes — it takes nothing`])
  }

  return await answering(async () => {
    const summary = await reconcile({ workspace: codeRoot(), dryRun: true })
    return told(
      keyedLines([
        ["would-apply", summary.applied],
        ["would-skip", summary.skipped],
        ["would-prune", summary.pruned],
      ])
    )
  })
}
