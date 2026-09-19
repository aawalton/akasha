import { type FileChange, pathsOf } from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { Given, Kind } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  changingOf,
  owedIn,
} from "akasha/domain/context/modules/warranting/warranting.module.code.ts"

export function unwarrantedIn(
  given: Given,
  kind: Kind | null,
  changes: readonly FileChange[]
): readonly string[] {
  if (kind?.writerOwesReading === false) return []
  return owedIn(
    given.root,
    given.agentId,
    changes.flatMap(pathsOf),
    changingOf(given.root, changes)
  )
}
