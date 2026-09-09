import { changingOf, owedIn } from "akasha/context/modules/warranting/warranting.module.code.ts"
import type { Given } from "../../../command-system/calling/calling.module.code.ts"
import type { FileEdit } from "../landing/landing.module.code.ts"

export function unwarrantedIn(given: Given, changes: readonly FileEdit[]): readonly string[] {
  if (given.changeKind?.writerOwesReading === false) return []
  return owedIn(
    given.root,
    given.agentId,
    changes.map((one) => one.path),
    changingOf(given.root, changes)
  )
}
