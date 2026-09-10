import type { Domain } from "../../domains/domain.page-type.ts"
import type { Shell } from "./properties/shell.code-file-property.ts"
import type { Sourced } from "./properties/sourced.boolean-property.ts"

export type ShellScript = Domain & {
  shell: Shell
  sourced: Sourced
}
