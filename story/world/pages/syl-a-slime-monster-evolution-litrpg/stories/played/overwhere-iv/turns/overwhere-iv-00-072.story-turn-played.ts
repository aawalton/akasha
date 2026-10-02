import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIv00072 = {
  id: "01a0fe86-ce05-77fd-aaf9-ec784282797c",
  type: "page-type/story-turn-played",
  slug: "overwhere-iv-00-072",
  ownLength: 162,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iv"],
  position: 72,
  prose: "txt",
  characters: ["character-player/overwhere-iv-nala"],
  stepStatus: "step-status/reviewers",
  action:
    "I blow the horn, then watch to see what the torches do, ready to slice goblins if they approach",
  beats: [
    "Nala puts the cow horn to her lips and blows. The blast rolls out over the meadow and the ford.",
    "Across the meadow, both torches go out at once. Darkness at the Tangle's edge.",
    "Nothing comes across the grass. She waits, spear ready, eyes on the dark trees.",
    "The cottage door bangs. Out comes Tull with his cudgel, and Aldo, head bound, with a hayfork.",
    "Tull looks at the dark line of the Tangle a long while. Then he nods once, and stays.",
    "Aldo hefts his hayfork, wide awake and grinning in spite of his bandage.",
    "The night goes on. The torches don't come back. The sheep settle. The stars wheel over.",
    "Tull goes in at last. Aldo dozes against the fold wall, the hayfork across his knees.",
    "Grey light comes up behind the town. The Tangle's edge stands dark and quiet across the meadow.",
    'Aldo wakes, blinking. He looks at the trees, then at her. "Will you watch again tonight?"',
  ],
  lore: [
    "lore/overwhere-iv-nala",
    "lore/overwhere-iv-nala-2",
    "lore/overwhere-iv-nala-3",
    "place/overwhere-iv-the-tangle",
    "place/overwhere-iv-tull-farm",
  ],
  endsAt: "2026-10-06T06:30:00.000Z",
} as const satisfies StoryTurnPlayed
