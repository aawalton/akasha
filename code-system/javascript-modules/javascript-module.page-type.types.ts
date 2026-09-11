import type { Javascript } from "akasha/code-system/javascript-modules/properties/javascript.code-file-property.ts"
import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export type JavascriptModule = Domain & {
  javascript: Javascript
}
