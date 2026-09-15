import type { AttributeLevel } from "akasha/alan/attribute/properties/attribute-level.computed-property.types.ts"
import type { PointUnit } from "akasha/alan/attribute/properties/point-unit.text-property.types.ts"
import type { PointsBeforeToday } from "akasha/alan/attribute/properties/points-before-today.number-property.types.ts"
import type { PointsToday } from "akasha/alan/attribute/properties/points-today.number-property.types.ts"
import type { PointsTotal } from "akasha/alan/attribute/properties/points-total.number-property.types.ts"
import type { Code } from "akasha/code/module/properties/code.code-file-property.types.ts"
import type { Test } from "akasha/code/module/properties/test.code-file-property.types.ts"
import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export type Attribute = Domain & {
  code?: Code
  test?: Test
  pointUnit: PointUnit
  pointsBeforeToday?: PointsBeforeToday
  pointsToday?: PointsToday
  pointsTotal?: PointsTotal
  level?: AttributeLevel
}
