import type { Swift } from "akasha/code/ios-component/properties/swift.code-file-property.types.ts"
import type { Main } from "akasha/code/ios-program/properties/main.code-file-property.types.ts"
import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export type IosHarness = Domain & {
  swift?: Swift
  main?: Main
}
