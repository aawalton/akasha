import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { EXIT } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import { editsAt } from "akasha/changes/modules/edits-keeping/edits-keeping.module.code.ts"
import type { Judging } from "akasha/checks/modules/judging/judging.module.code.ts"
import type {
  Drafted,
  Drafting,
} from "akasha/commands/modules/draft-keeping/draft-keeping.module.code.ts"
import type { Refused } from "akasha/commands/modules/landing/landing.module.code.ts"
import { landing } from "akasha/commands/modules/landing/landing.module.code.ts"
import {
  ADMITS,
  type Held,
  PAGE,
  statedIn,
} from "akasha/commands/modules/landing/landing.module.test-fixtures.ts"

export const DRAFT: Drafting = { page: PAGE }

export function drafting(
  root: string,
  changes: readonly Held[],
  gate: Judging = ADMITS,
  read: string | null = null
): Promise<Drafted | Refused> {
  const said = statedIn(root, changes)
  if ("why" in said) {
    return Promise.resolve({
      refusals: [said.why, "nothing was drafted — the edits are as the edits were"],
      code: EXIT.DATA,
    })
  }
  return landing(root, said.rows, "held", gate, null, read, [], DRAFT)
}

export function keptText(root: string): string {
  const at = editsAt(PAGE)
  if (at === null) return ""
  const full = join(root, at)
  return existsSync(full) ? readFileSync(full, "utf8") : ""
}
