import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIii00093 = {
  id: "01a101b8-75b7-71e1-a171-abf4f9b51df2",
  type: "page-type/story-turn-played",
  slug: "overwhere-iii-00-093",
  cover: "image/image-b6b61fe4e6377127",
  ownLength: 152,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iii"],
  position: 93,
  prose: "txt",
  characters: [
    "character-player/overwhere-iii-nala",
    "character-other/overwhere-iii-marda-hesk",
    "character-other/overwhere-iii-brannagh-tull",
  ],
  stepStatus: "step-status/player",
  action:
    "“Jackalopes.” I go out to the shrine and use ambient weaves to cleanse the five blightstones.",
  beats: "jsonl",
  issues: "txt",
  lore: [
    "lore/overwhere-iii-brannagh-tull",
    "lore/overwhere-iii-brannagh-tull-2",
    "lore/overwhere-iii-marda-hesk",
    "lore/overwhere-iii-marda-hesk-2",
    "lore/overwhere-iii-nala",
    "lore/overwhere-iii-nala-2",
    "lore/overwhere-iii-nala-3",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/memory",
    "story-recorder/picture",
    "story-recorder/mechanics",
  ],
  endsAt: "2026-10-09T14:45:00.000Z",
  coverAfter: "Six glimmer specks.",
} as const satisfies StoryTurnPlayed
