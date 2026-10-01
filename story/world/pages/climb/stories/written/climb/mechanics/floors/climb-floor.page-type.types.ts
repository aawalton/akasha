import type { WorldQuest } from "akasha/story/world/mechanics/quests/world-quest.page-type.types.ts"
import type { ClimbFloorCharacter } from "akasha/story/world/pages/climb/stories/written/climb/mechanics/floors/properties/climb-floor-character.relation-property.types.ts"
import type { ClimbFloorStatus } from "akasha/story/world/pages/climb/stories/written/climb/mechanics/floors/properties/climb-floor-status.select-property.types.ts"
import type { ClimbFloorTask } from "akasha/story/world/pages/climb/stories/written/climb/mechanics/floors/properties/climb-floor-task.text-property.types.ts"

export type ClimbFloor = WorldQuest & {
  character: ClimbFloorCharacter
  objective: ClimbFloorTask
  status: ClimbFloorStatus
}
