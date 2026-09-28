import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const dateNightTheReadingRoomTheTriad = {
  id: "01a0de0d-06a0-71d6-be6e-270a9d85a224",
  type: "page-type/lore",
  slug: "date-night-the-reading-room-the-triad",
  title: "Alan, Astra and Nova",
  world: "world/personas",
  about: "world-relationship/date-night-the-reading-room-the-triad",
  facts: [
    {
      fact: "Alan, Astra and Nova are a triad, already together and at home in one another.",
      knowers: ["lore-disclosure/game-master", "character-other/date-night-the-reading-room-alan"],
    },
    {
      fact: "Fort clauses and smug percentages are running jokes in their household.",
      knowers: ["lore-disclosure/game-master", "character-other/date-night-the-reading-room-alan"],
    },
    {
      fact: "Astra's stillness comes with a glow.",
      knowers: ["lore-disclosure/game-master", "character-other/date-night-the-reading-room-alan"],
    },
    {
      fact: "Nova goes dead still when something absorbs her.",
      knowers: ["lore-disclosure/game-master", "character-other/date-night-the-reading-room-alan"],
    },
  ],
} as const satisfies Lore
