import type { Id } from "akasha/page/properties/id.text-property.types.ts"
import type { CastConditionType } from "akasha/temper/catalog/companion/skill/properties/cast-condition-type.text-property.types.ts"
import type { EffectConditions } from "akasha/temper/catalog/companion/skill/properties/effect-conditions.record-property.types.ts"
import type { EnemyTypes } from "akasha/temper/catalog/companion/skill/properties/enemy-types.text-property.types.ts"
import type { HealthBelow } from "akasha/temper/catalog/companion/skill/properties/health-below.number-property.types.ts"
import type { IsMovable } from "akasha/temper/catalog/companion/skill/properties/is-movable.boolean-property.types.ts"
import type { MinDistance } from "akasha/temper/catalog/companion/skill/properties/min-distance.number-property.types.ts"
import type { TargetType } from "akasha/temper/catalog/companion/skill/properties/target-type.text-property.types.ts"

export type CastConditions = "jsonl"

export type CastConditionsRow = {
  id: Id
  type: CastConditionType
  below?: HealthBelow
  targetType?: TargetType
  minDistance?: MinDistance
  isMovable?: IsMovable
  enemyTypes?: EnemyTypes
  conditions?: EffectConditions
}
