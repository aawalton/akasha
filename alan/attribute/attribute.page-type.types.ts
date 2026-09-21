import type { PointUnit } from "akasha/alan/attribute/properties/point-unit.text-property.types.ts"
import type { Code } from "akasha/code/module/properties/code.code-file-property.types.ts"
import type { Test } from "akasha/code/module/properties/test.code-file-property.types.ts"
import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export type Attribute = Domain & {
  code?: Code
  test?: Test
  pointUnit: PointUnit
}
