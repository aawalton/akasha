import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIv00043 = {
  id: "01a0f471-3b67-75fa-9e37-469297617642",
  type: "page-type/story-turn-played",
  slug: "overwhere-iv-00-043",
  ownLength: 129,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iv"],
  position: 43,
  prose: "txt",
  characters: ["character-player/overwhere-iv-nala", "character-other/overwhere-iv-ilsa-crane"],
  stepStatus: "step-status/reviewers",
  action:
    "“I’m think I’m done for today. Where in town might I find books to read? I worked my body and my mana, time to work my mind.”",
  beats: [
    'Nala pockets the silver. "I think I\'m done for today. Where in town might I find books to read?"',
    '"I\'ve worked my body and my mana. Time to work my mind."',
    'Ilsa laughs, surprised. "Books. In Millbrook." She taps the pencil against her lip.',
    "\"There's no bookseller. The few books we have are dear, and most sit on the shrine's shelf.\"",
    '"Sister Anwen keeps them, off the square. She\'ll let a sober reader sit with one by daylight."',
    "She reaches under the counter and sets a thick, worn volume on the wood, with the guild sign on it.",
    "\"Or there's this. The guild handbook. Ranks, bounty rules, the kingdom's monsters, affinity lights.\"",
    "\"It doesn't leave the hall. But the hearth table's free, if you'd rather read here.\"",
  ],
  lore: [
    "lore/overwhere-iv-ilsa-crane-2",
    "lore/overwhere-iv-nala",
    "lore/overwhere-iv-nala-2",
    "place/overwhere-iv-millbrook-shrine",
  ],
  endsAt: "2026-10-02T10:08:00.000Z",
} as const satisfies StoryTurnPlayed
