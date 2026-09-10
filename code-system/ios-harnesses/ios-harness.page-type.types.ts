import type { Domain } from "../../domains/domain.page-type.ts"
import type { Swift } from "../ios-components/properties/swift.code-file-property.ts"
import type { Main } from "../ios-programs/properties/main.code-file-property.ts"

export type IosHarness = Domain & {
  swift?: Swift
  main?: Main
}
