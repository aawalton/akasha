import type { Scripting } from "akasha/code/shell-scripts/properties/scripting.module-property-group.ts"
import type { Shell } from "akasha/code/shell-scripts/properties/shell.code-file-property.types.ts"
import type { Sourced } from "akasha/code/shell-scripts/properties/sourced.boolean-property.types.ts"
import type { Domain } from "akasha/domains/domain.page-type.types.ts"
import type { InstallPath } from "akasha/infrastructure/machines/provisioning/provisioned-files/properties/install-path.text-property.types.ts"
import type { OnlyOn } from "akasha/infrastructure/machines/provisioning/provisioned-files/properties/only-on.select-property.types.ts"

export type ShellScript = Domain & {
  shell: Shell
  sourced: Sourced
  scripting?: Scripting
  installPath?: InstallPath
  onlyOn?: OnlyOn
}
