import type { Code } from "../../code-system/modules/properties/code.code-file-property.ts"
import type { Test } from "../../code-system/modules/properties/test.code-file-property.ts"
import type { Domain } from "../../domains/domain.page-type.types.ts"
import type { AttributeLevel } from "./properties/attribute-level.computed-property.types.ts"
import type { PointUnit } from "./properties/point-unit.text-property.ts"
import type { PointsBeforeToday } from "./properties/points-before-today.number-property.types.ts"
import type { PointsToday } from "./properties/points-today.number-property.types.ts"
import type { PointsTotal } from "./properties/points-total.number-property.types.ts"

export type Attribute = Domain & {
  code?: Code
  test?: Test
  pointUnit: PointUnit
  pointsBeforeToday?: PointsBeforeToday
  pointsToday?: PointsToday
  pointsTotal?: PointsTotal
  level?: AttributeLevel
}
