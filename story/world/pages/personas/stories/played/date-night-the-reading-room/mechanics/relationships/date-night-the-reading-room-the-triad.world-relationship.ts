import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const dateNightTheReadingRoomTheTriad = {
  id: "01a0decf-4151-7e05-b88f-4b0b24569c92",
  type: "page-type/world-relationship",
  slug: "date-night-the-reading-room-the-triad",
  title: "Alan, Astra and Nova",
  world: "world/personas",
  characters: [
    "character-player/date-night-the-reading-room-alan",
    "character-other/date-night-the-reading-room-astra",
    "character-other/date-night-the-reading-room-nova",
  ],
} as const satisfies WorldRelationship
