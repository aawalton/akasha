import { unitBodyOf } from "akasha/infrastructure/machine/provisioning/provisioned-file/modules/unit-limits/unit-limits.module.code.ts"
import { tmuxScopeMemory as page } from "akasha/infrastructure/machine/provisioning/provisioned-file/pages/tmux-scope-memory/tmux-scope-memory.provisioned-file.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"

const SECTION = "Scope"

export function bodyIn(given: string | Reading): string {
  return unitBodyOf(given, page, SECTION)
}
