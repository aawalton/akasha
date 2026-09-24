import type { Components } from "akasha/code/ios-program/properties/components.multi-relation-property.types.ts"
import type { Entitlements } from "akasha/code/ios-program/properties/entitlements.file-property.types.ts"
import type { InfoPlist } from "akasha/code/ios-program/properties/info-plist.file-property.types.ts"
import type { Main } from "akasha/code/ios-program/properties/main.code-file-property.types.ts"
import type { TargetName } from "akasha/code/ios-program/properties/target-name.text-property.types.ts"
import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export type IosProgram = Domain & {
  components?: Components
  targetName?: TargetName
  main?: Main
  infoPlist?: InfoPlist
  entitlements?: Entitlements
}
