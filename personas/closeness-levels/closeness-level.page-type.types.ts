import type { Domain } from "../../domains/domain.page-type.types.ts"
import type { Level } from "./properties/level.number-property.types.ts"
import type { PointsToHere } from "./properties/points-to-here.number-property.types.ts"
import type { PointsToNext } from "./properties/points-to-next.number-property.types.ts"
import type { Pose } from "./properties/pose.text-property.ts"
import type { Stage } from "./properties/stage.text-property.ts"
import type { Wardrobe } from "./properties/wardrobe.text-property.ts"

export type ClosenessLevel = Domain & {
  level: Level
  pointsToHere: PointsToHere
  pointsToNext: PointsToNext
  stage: Stage
  wardrobe: Wardrobe
  pose: Pose
}
