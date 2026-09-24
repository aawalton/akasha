import type { Domain } from "akasha/domain/domain.page-type.types.ts"
import type { CpuShare } from "akasha/infrastructure/cpu/limit/properties/cpu-share.number-property.types.ts"
import type { Content } from "akasha/infrastructure/machine/provisioning/provisioned-file/properties/content.file-property.types.ts"
import type { Filling } from "akasha/infrastructure/machine/provisioning/provisioned-file/properties/filling.module-property-group.ts"
import type { InstallPath } from "akasha/infrastructure/machine/provisioning/provisioned-file/properties/install-path.text-property.types.ts"
import type { MaskedUnits } from "akasha/infrastructure/machine/provisioning/provisioned-file/properties/masked-units.text-property.types.ts"
import type { OnlyOn } from "akasha/infrastructure/machine/provisioning/provisioned-file/properties/only-on.select-property.types.ts"
import type { PlacedBy } from "akasha/infrastructure/machine/provisioning/provisioned-file/properties/placed-by.select-property.types.ts"
import type { ReloadWith } from "akasha/infrastructure/machine/provisioning/provisioned-file/properties/reload-with.text-property.types.ts"
import type { UnitMaxMemoryMb } from "akasha/infrastructure/machine/provisioning/provisioned-file/properties/unit-max-memory-mb.number-property.types.ts"
import type { KillMemoryMb } from "akasha/infrastructure/memory/limit/properties/kill-memory-mb.number-property.types.ts"

export type ProvisionedFile = Domain & {
  content: Content
  placedBy: PlacedBy
  onlyOn: OnlyOn
  installPath?: InstallPath
  reloadWith?: ReloadWith
  filling?: Filling
  cpuShare?: CpuShare
  maskedUnits?: MaskedUnits
  killMemoryMb?: KillMemoryMb
  maxMemoryMb?: UnitMaxMemoryMb
}
