import type { Id } from "akasha/page/properties/id.text-property.types.ts"
import type { AchievementPoints } from "akasha/temper/catalog/pursuit/temper-achievement-category/properties/achievement-points.number-property.types.ts"
import type { EsoAchievementId } from "akasha/temper/catalog/pursuit/temper-achievement-category/properties/eso-achievement-id.number-property.types.ts"
import type { TotalSteps } from "akasha/temper/catalog/pursuit/temper-achievement-category/properties/total-steps.number-property.types.ts"
import type { AchievementName } from "akasha/temper/catalog/thing/properties/achievement-name.text-property.types.ts"

export type Achievements = "jsonl"

export type AchievementsRow = {
  id: Id
  esoAchievementId: EsoAchievementId
  name: AchievementName
  achievementPoints: AchievementPoints
  totalSteps: TotalSteps
}
