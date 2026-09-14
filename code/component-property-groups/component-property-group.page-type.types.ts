import type { Code } from "akasha/code/modules/properties/code.code-file-property.types.ts"
import type { FilePropertyGroup } from "akasha/pages/file-property-groups/file-property-group.page-type.types.ts"

export type ComponentPropertyGroup = FilePropertyGroup & {
  code?: Code
}
