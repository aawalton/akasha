import type { Domain } from "../../../domains/domain.page-type.types.ts"
import type { Content } from "./properties/content.file-property.ts"
import type { InstallPath } from "./properties/install-path.text-property.ts"
import type { OnlyOn } from "./properties/only-on.select-property.ts"
import type { PlacedBy } from "./properties/placed-by.select-property.ts"
import type { ReloadWith } from "./properties/reload-with.text-property.ts"

export type ProvisionedFile = Domain & {
  content: Content
  placedBy: PlacedBy
  onlyOn: OnlyOn
  installPath?: InstallPath
  reloadWith?: ReloadWith
}
