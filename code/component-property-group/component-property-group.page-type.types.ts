import type { Code } from "akasha/code/module/properties/code.code-file-property.types.ts"
import type { FilePropertyGroup } from "akasha/page/file-property-group/file-property-group.page-type.types.ts"

export type ComponentPropertyGroup = FilePropertyGroup & {
  code?: Code
}
