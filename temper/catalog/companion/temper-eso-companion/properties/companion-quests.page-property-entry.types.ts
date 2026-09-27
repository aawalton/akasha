import type { Id } from "akasha/page/properties/id.text-property.types.ts"
import type { RequiredRapportLevel } from "akasha/temper/catalog/companion/temper-eso-companion/properties/required-rapport-level.number-property.types.ts"
import type { EsoQuestId } from "akasha/temper/catalog/world/zone/properties/eso-quest-id.number-property.types.ts"
import type { QuestName } from "akasha/temper/catalog/world/zone/properties/quest-name.text-property.types.ts"

export type CompanionQuests = "jsonl"

export type CompanionQuestsRow = {
  id: Id
  esoQuestId: EsoQuestId
  questName: QuestName
  requiredRapportLevel?: RequiredRapportLevel
}
