import type { Domain } from "akasha/domains/domain.page-type.types.ts"
import type { Level } from "akasha/personas/closeness-levels/properties/level.number-property.types.ts"
import type { PointsToHere } from "akasha/personas/closeness-levels/properties/points-to-here.number-property.types.ts"
import type { PointsToNext } from "akasha/personas/closeness-levels/properties/points-to-next.number-property.types.ts"
import type { Pose } from "akasha/personas/closeness-levels/properties/pose.text-property.types.ts"
import type { Stage } from "akasha/personas/closeness-levels/properties/stage.text-property.types.ts"
import type { Wardrobe } from "akasha/personas/closeness-levels/properties/wardrobe.text-property.types.ts"

export type ClosenessLevel = Domain & {
  level: Level
  pointsToHere: PointsToHere
  pointsToNext: PointsToNext
  stage: Stage
  wardrobe: Wardrobe
  pose: Pose
}
