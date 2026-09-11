import type { BundleId } from "akasha/code/ios-apps/properties/bundle-id.text-property.types.ts"
import type { Components } from "akasha/code/ios-programs/properties/components.relation-property.types.ts"
import type { Entitlements } from "akasha/code/ios-programs/properties/entitlements.file-property.types.ts"
import type { InfoPlist } from "akasha/code/ios-programs/properties/info-plist.file-property.types.ts"
import type { Main } from "akasha/code/ios-programs/properties/main.code-file-property.types.ts"
import type { ProfileName } from "akasha/code/ios-programs/properties/profile-name.text-property.types.ts"
import type { TargetName } from "akasha/code/ios-programs/properties/target-name.text-property.types.ts"
import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export type IosProgram = Domain & {
  bundleId?: BundleId
  components?: Components
  profileName?: ProfileName
  targetName?: TargetName
  main?: Main
  infoPlist?: InfoPlist
  entitlements?: Entitlements
}
