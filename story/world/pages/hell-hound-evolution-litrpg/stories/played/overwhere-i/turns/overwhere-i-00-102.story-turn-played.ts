import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00102 = {
  id: "01a0ff47-0ee9-7f6e-9407-aa126ec2b010",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-102",
  cover: "image/image-de330c436b859de0",
  ownLength: 263,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 102,
  prose: "txt",
  characters: ["character-player/overwhere-i-nala", "character-other/overwhere-i-ghost-eye"],
  stepStatus: "step-status/player",
  action:
    "“Two hour walk is all? The Wyrm sounds like a nice warm up, I’ll take that tomorrow. For today, I’m looking for a nice place to stay as well as somewhere to sell miscellaneous loot from my adventures. Oh! And someone who can turn Ghost-Eye here into a proper casting focus.” I pull out the drakewolf eye. “Recommendations?”",
  beats: "jsonl",
  issues: [
    '"where the Weir Wyrm slip is pinned" - Grete laid that slip flat on the counter last turn',
  ],
  lore: [
    "lore/overwhere-i-nala",
    "lore/overwhere-i-nala-2",
    "lore/overwhere-i-wendlow-2",
    "place/overwhere-i-wendlow",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/memory",
    "story-recorder/picture",
    "story-recorder/mechanics",
  ],
  endsAt: "2026-10-05T12:40:00.000Z",
  coverAfter: "You dig into your pack and bring out the eye: a hard pearl",
} as const satisfies StoryTurnPlayed
