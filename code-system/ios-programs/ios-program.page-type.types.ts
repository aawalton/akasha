import type { Domain } from "../../domains/domain.page-type.types.ts"
import type { BundleId } from "../ios-apps/properties/bundle-id.text-property.ts"
import type { Components } from "./properties/components.relation-property.ts"
import type { Entitlements } from "./properties/entitlements.file-property.ts"
import type { InfoPlist } from "./properties/info-plist.file-property.ts"
import type { Main } from "./properties/main.code-file-property.ts"
import type { ProfileName } from "./properties/profile-name.text-property.ts"
import type { TargetName } from "./properties/target-name.text-property.ts"

export type IosProgram = Domain & {
  bundleId?: BundleId
  components?: Components
  profileName?: ProfileName
  targetName?: TargetName
  main?: Main
  infoPlist?: InfoPlist
  entitlements?: Entitlements
}
