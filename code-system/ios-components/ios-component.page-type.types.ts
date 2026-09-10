import type { Domain } from "../../domains/domain.page-type.types.ts"
import type { Swift } from "./properties/swift.code-file-property.ts"

export type IosComponent = Domain & {
  swift: Swift
}
