import type { Domain } from "akasha/domains/domain.page-type.types.ts"
import type { Content } from "akasha/machines/provisioning/provisioned-files/properties/content.file-property.ts"
import type { InstallPath } from "akasha/machines/provisioning/provisioned-files/properties/install-path.text-property.types.ts"
import type { OnlyOn } from "akasha/machines/provisioning/provisioned-files/properties/only-on.select-property.types.ts"
import type { PlacedBy } from "akasha/machines/provisioning/provisioned-files/properties/placed-by.select-property.types.ts"
import type { ReloadWith } from "akasha/machines/provisioning/provisioned-files/properties/reload-with.text-property.types.ts"

export type ProvisionedFile = Domain & {
  content: Content
  placedBy: PlacedBy
  onlyOn: OnlyOn
  installPath?: InstallPath
  reloadWith?: ReloadWith
}
