import { type Answer, refusing } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { appendOnlyIn } from "akasha/page/index/modules/file-appending/file-appending.module.code.ts"
import type { Facing } from "akasha/page/index/modules/property-carrying/property-carrying.module.code.ts"

function rewriteRefusal(path: string): string {
  return (
    `\`${path}\` is append-only, so a change rewriting its body is refused rather than ` +
    "landed — append lines to its end instead"
  )
}

export function heldToAppending(facing: Facing, said: Answer): Answer {
  const rewritten = new Set<string>()
  for (const one of said.edits) {
    if (one.kind === "replace" && appendOnlyIn(facing, one.path)) rewritten.add(one.path)
  }
  if (rewritten.size === 0) return said
  return refusing([...rewritten].map(rewriteRefusal).join("; "))
}
