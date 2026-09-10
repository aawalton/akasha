import type { Domain } from "../../domains/domain.page-type.types.ts"
import type { Javascript } from "./properties/javascript.code-file-property.ts"

export type JavascriptModule = Domain & {
  javascript: Javascript
}
