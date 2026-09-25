import type { Scripting } from "akasha/code/shell-script/properties/scripting.module-property-group.ts"
import type { Shell } from "akasha/code/shell-script/properties/shell.code-file-property.types.ts"
import type { Sourced } from "akasha/code/shell-script/properties/sourced.boolean-property.types.ts"
import type { Domain } from "akasha/domain/domain.page-type.types.ts"
import type { InstallPath } from "akasha/infrastructure/machine/provisioning/provisioned-file/properties/install-path.text-property.types.ts"
import type { OnlyOn } from "akasha/infrastructure/machine/provisioning/provisioned-file/properties/only-on.select-property.types.ts"
import type { PlacedBy } from "akasha/infrastructure/machine/provisioning/provisioned-file/properties/placed-by.select-property.types.ts"

export type ShellScript = Domain & {
  shell: Shell
  sourced: Sourced
  scripting?: Scripting
  installPath?: InstallPath
  onlyOn?: OnlyOn
  placedBy?: PlacedBy
}
