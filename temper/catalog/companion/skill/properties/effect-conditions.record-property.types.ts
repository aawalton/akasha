import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"
import type { ConditionKind } from "akasha/temper/catalog/companion/skill/properties/condition-kind.text-property.types.ts"
import type { ConditionWeaponType } from "akasha/temper/catalog/companion/skill/properties/condition-weapon-type.text-property.types.ts"
import type { EnemyTypes } from "akasha/temper/catalog/companion/skill/properties/enemy-types.text-property.types.ts"
import type { HealthBelow } from "akasha/temper/catalog/companion/skill/properties/health-below.number-property.types.ts"
import type { IsCasting } from "akasha/temper/catalog/companion/skill/properties/is-casting.boolean-property.types.ts"
import type { MaxDistance } from "akasha/temper/catalog/companion/skill/properties/max-distance.number-property.types.ts"
import type { MinDistance } from "akasha/temper/catalog/companion/skill/properties/min-distance.number-property.types.ts"
import type { TargetType } from "akasha/temper/catalog/companion/skill/properties/target-type.text-property.types.ts"

export type EffectConditions = List<{
  type?: ConditionKind
  below?: HealthBelow
  targetType?: TargetType
  minDistance?: MinDistance
  maxDistance?: MaxDistance
  isCasting?: IsCasting
  weaponType?: ConditionWeaponType
  enemyTypes?: EnemyTypes
}>
