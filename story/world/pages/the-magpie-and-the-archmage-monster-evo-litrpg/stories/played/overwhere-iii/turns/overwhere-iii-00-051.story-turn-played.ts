import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIii00051 = {
  id: "01a0fd47-0a92-7774-b434-b28165b003fb",
  type: "page-type/story-turn-played",
  slug: "overwhere-iii-00-051",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iii"],
  position: 51,
  stepStatus: "step-status/game-master",
  action:
    "I check in at Brannagh’s and the Post to drain my mana, then train my body with the guards.",
  lore: [
    "lore/overwhere-iii-brannagh-tull",
    "lore/overwhere-iii-brannagh-tull-2",
    "lore/overwhere-iii-corruption",
    "lore/overwhere-iii-maud-ferrow",
    "lore/overwhere-iii-mending-weave",
    "lore/overwhere-iii-the-system",
    "place/overwhere-iii-merrowgate-guild-post",
  ],
  endsAt: "2026-10-04T10:30:00.000Z",
} as const satisfies StoryTurnPlayed
