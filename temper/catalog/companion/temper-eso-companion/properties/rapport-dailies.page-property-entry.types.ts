import type { Id } from "akasha/page/properties/id.text-property.types.ts"
import type { QuestName } from "akasha/temper/catalog/world/zone/properties/quest-name.text-property.types.ts"

export type RapportDailies = "jsonl"

export type RapportDailiesRow = {
  id: Id
  questName: QuestName
}
