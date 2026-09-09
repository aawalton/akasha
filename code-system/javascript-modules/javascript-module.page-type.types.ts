import type { Domain } from "../../domains/domain.page-type.ts"
import type { Javascript } from "./properties/javascript.code-file-property.ts"

export type JavascriptModule = Domain & {
  javascript: Javascript
}
