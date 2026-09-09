import { pathsOf } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type { FileChange } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import { changingOf, owedIn } from "akasha/context/modules/warranting/warranting.module.code.ts"
import type { Given } from "../calling/calling.module.code.ts"

export function unwarrantedIn(given: Given, changes: readonly FileChange[]): readonly string[] {
  if (given.changeKind?.writerOwesReading === false) return []
  return owedIn(
    given.root,
    given.agentId,
    changes.flatMap(pathsOf),
    changingOf(given.root, changes)
  )
}
