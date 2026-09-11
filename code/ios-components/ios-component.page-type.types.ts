import type { Swift } from "akasha/code/ios-components/properties/swift.code-file-property.types.ts"
import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export type IosComponent = Domain & {
  swift: Swift
}
