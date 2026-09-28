import type { WorldQuest } from "akasha/story/world/mechanics/quests/world-quest.page-type.types.ts"
import type { HaremHotelFloorCharacter } from "akasha/story/world/pages/harem-hotel/stories/written/harem-hotel/mechanics/floors/properties/harem-hotel-floor-character.relation-property.types.ts"
import type { HaremHotelFloorStatus } from "akasha/story/world/pages/harem-hotel/stories/written/harem-hotel/mechanics/floors/properties/harem-hotel-floor-status.select-property.types.ts"
import type { HaremHotelFloorTask } from "akasha/story/world/pages/harem-hotel/stories/written/harem-hotel/mechanics/floors/properties/harem-hotel-floor-task.text-property.types.ts"

export type HaremHotelFloor = WorldQuest & {
  character: HaremHotelFloorCharacter
  objective: HaremHotelFloorTask
  status: HaremHotelFloorStatus
}
