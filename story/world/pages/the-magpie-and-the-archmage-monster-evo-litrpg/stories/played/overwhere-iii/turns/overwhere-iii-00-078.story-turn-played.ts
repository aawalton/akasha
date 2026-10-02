import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIii00078 = {
  id: "01a0fef3-cba1-77d6-98a9-be3bfae9cc94",
  type: "page-type/story-turn-played",
  slug: "overwhere-iii-00-078",
  ownLength: 104,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iii"],
  position: 78,
  prose: "txt",
  characters: ["character-player/overwhere-iii-nala", "character-other/overwhere-iii-marda-hesk"],
  stepStatus: "step-status/recorders",
  action:
    "“I didn’t either, good to know. Could I buy glimmershards? How much do they run? I’m one short of appraise.”",
  beats: [
    "Nala flexes her healed hands. A blue window opens at the edge of her sight.",
    "[Mending Weave has advanced: Basic → Novice]",
    '"I didn\'t either, good to know. Could I buy glimmershards?"',
    '"How much do they run? I\'m one short of appraise."',
    '"Glimmerstones, you mean." Marda shakes her head. "The Post doesn\'t trade them. I\'ve none to sell."',
    '"Town price is about twenty copper, when anyone will part with one."',
    '"Hunters drinking at the Crook and Candle have one to sell now and then."',
    "Nala reaches into her Inventory to count. Her three. The one she pressed at the shrine. The wolf's.",
    "Five glimmerstones.",
  ],
  issues: [
    '"Five glimmerstones. Enough for Appraise." - No Prompt',
    '"Town price is about twenty-five copper" - a glimmerstone sells for 20 copper in a town',
  ],
  lore: [
    "lore/overwhere-iii-marda-hesk",
    "lore/overwhere-iii-marda-hesk-2",
    "lore/overwhere-iii-mending-weave",
    "lore/overwhere-iii-nala",
    "lore/overwhere-iii-nala-2",
    "lore/overwhere-iii-nala-2-2",
    "place/overwhere-iii-crook-and-candle",
    "place/overwhere-iii-merrowgate",
    "place/overwhere-iii-merrowgate-guild-post",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  endsAt: "2026-10-07T16:11:00.000Z",
} as const satisfies StoryTurnPlayed
