import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIii00049 = {
  id: "01a0fd2e-7566-79ab-87e0-56f13bd78706",
  type: "page-type/story-turn-played",
  slug: "overwhere-iii-00-049",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iii"],
  position: 49,
  stepStatus: "step-status/game-master",
  action:
    "I go and check at the clinic, then at the post, using up my mana, then go back to reading",
  lore: [
    "lore/overwhere-iii-brannagh-tull",
    "lore/overwhere-iii-brannagh-tull-2",
    "lore/overwhere-iii-corruption",
    "lore/overwhere-iii-mending-weave",
    "lore/overwhere-iii-wrenmark-beast-guide",
    "place/overwhere-iii-merrowgate-guild-post",
  ],
  endsAt: "2026-10-03T18:00:00.000Z",
} as const satisfies StoryTurnPlayed
