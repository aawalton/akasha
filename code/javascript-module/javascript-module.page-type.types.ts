import type { Javascript } from "akasha/code/javascript-module/properties/javascript.code-file-property.types.ts"
import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export type JavascriptModule = Domain & {
  javascript: Javascript
}
