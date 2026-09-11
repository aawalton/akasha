import type { Swift } from "akasha/code-system/ios-components/properties/swift.code-file-property.ts"
import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export type IosComponent = Domain & {
  swift: Swift
}
