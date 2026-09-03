import type { Answer } from "@akasha/command-system/calling"
import { codeRoot } from "@akasha/pages-system/code-root"
import { reconcile } from "@tools/lib/inference/reconcile"
import {
  answering,
  keyedLines,
  refusalIn,
  refusedBy,
  told,
  wordsIn,
} from "../inference-answering/inference-answering.module.code.ts"

export async function inferenceApply(argv: readonly string[]): Promise<Answer> {
  const said = wordsIn(argv, [], [])
  const saidRefused = refusalIn(said)
  if (saidRefused !== null) return refusedBy(saidRefused)
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
