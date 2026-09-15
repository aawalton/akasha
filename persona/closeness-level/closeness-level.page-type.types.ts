import type { Domain } from "akasha/domain/domain.page-type.types.ts"
import type { Level } from "akasha/persona/closeness-level/properties/level.number-property.types.ts"
import type { PointsToHere } from "akasha/persona/closeness-level/properties/points-to-here.number-property.types.ts"
import type { PointsToNext } from "akasha/persona/closeness-level/properties/points-to-next.number-property.types.ts"
import type { Pose } from "akasha/persona/closeness-level/properties/pose.text-property.types.ts"
import type { Stage } from "akasha/persona/closeness-level/properties/stage.text-property.types.ts"
import type { Wardrobe } from "akasha/persona/closeness-level/properties/wardrobe.text-property.types.ts"

export type ClosenessLevel = Domain & {
  level: Level
  pointsToHere: PointsToHere
  pointsToNext: PointsToNext
  stage: Stage
  wardrobe: Wardrobe
  pose: Pose
}
