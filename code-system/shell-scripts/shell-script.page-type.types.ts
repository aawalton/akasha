import type { Scripting } from "akasha/code-system/shell-scripts/properties/scripting.module-property-group.ts"
import type { Shell } from "akasha/code-system/shell-scripts/properties/shell.code-file-property.ts"
import type { Sourced } from "akasha/code-system/shell-scripts/properties/sourced.boolean-property.types.ts"
import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export type ShellScript = Domain & {
  shell: Shell
  sourced: Sourced
  scripting?: Scripting
}
