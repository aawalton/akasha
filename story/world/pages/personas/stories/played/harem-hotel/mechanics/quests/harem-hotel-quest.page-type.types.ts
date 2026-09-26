import type { WorldQuest } from "akasha/story/world/mechanics/quests/world-quest.page-type.types.ts"
import type { HaremHotelQuestCharacter } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/quests/properties/harem-hotel-quest-character.relation-property.types.ts"
import type { HaremHotelQuestObjective } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/quests/properties/harem-hotel-quest-objective.text-property.types.ts"
import type { HaremHotelQuestReward } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/quests/properties/harem-hotel-quest-reward.text-property.types.ts"
import type { HaremHotelQuestStatus } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/quests/properties/harem-hotel-quest-status.select-property.types.ts"

export type HaremHotelQuest = WorldQuest & {
  character: HaremHotelQuestCharacter
  objective: HaremHotelQuestObjective
  reward?: HaremHotelQuestReward
  status: HaremHotelQuestStatus
}
