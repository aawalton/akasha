import { changingOf, owedIn } from "@akasha/context/warranting"
import type { Given } from "../../../command-system/calling/calling.module.code.ts"
import type { FileEdit } from "../../../command-system/landing/landing.module.code.ts"

export function unwarrantedIn(given: Given, changes: readonly FileEdit[]): readonly string[] {
  if (given.changeKind?.writerOwesReading === false) return []
  return owedIn(
    given.root,
    given.agentId,
    changes.map((one) => one.path),
    changingOf(given.root, changes)
  )
}
