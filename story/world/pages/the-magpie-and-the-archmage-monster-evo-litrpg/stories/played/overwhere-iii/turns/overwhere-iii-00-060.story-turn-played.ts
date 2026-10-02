import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIii00060 = {
  id: "01a0fdba-fd20-739e-ab88-f5a06fb59b46",
  type: "page-type/story-turn-played",
  slug: "overwhere-iii-00-060",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iii"],
  position: 60,
  stepStatus: "step-status/game-master",
  action:
    "I go back to the post to finish draining my mana, then to the shrine to recover, then back to Brannagh’s.",
  lore: [
    "lore/overwhere-iii-brannagh-tull",
    "lore/overwhere-iii-brannagh-tull-2",
    "lore/overwhere-iii-cleansing-weave",
    "lore/overwhere-iii-corruption",
    "place/overwhere-iii-merrowgate",
    "place/overwhere-iii-merrowgate-guild-post",
    "place/overwhere-iii-wrenwood-crossroads",
  ],
} as const satisfies StoryTurnPlayed
