import type { Main } from "akasha/code/ios-programs/properties/main.code-file-property.types.ts"
import type { Swift } from "akasha/code-system/ios-components/properties/swift.code-file-property.types.ts"
import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export type IosHarness = Domain & {
  swift?: Swift
  main?: Main
}
