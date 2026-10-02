import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIii00056 = {
  id: "01a0fd82-b710-724c-8baa-6d02835af2e0",
  type: "page-type/story-turn-played",
  slug: "overwhere-iii-00-056",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iii"],
  position: 56,
  stepStatus: "step-status/game-master",
  action:
    "I sleep, then in the morning I check in at Brannagh’s first thing, heal anyone waiting, then work on the blightstone again, this time, I try to focus the weave into a loop, so it doesn’t snap back into my arm.",
  lore: [
    "lore/overwhere-iii-brannagh-tull",
    "lore/overwhere-iii-brannagh-tull-2",
    "lore/overwhere-iii-cleansing-weave",
    "lore/overwhere-iii-corruption",
    "lore/overwhere-iii-mending-weave",
    "place/overwhere-iii-merrowgate-guild-post",
  ],
  endsAt: "2026-10-05T08:30:00.000Z",
} as const satisfies StoryTurnPlayed
