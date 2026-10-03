import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIii00071 = {
  id: "01a0fe73-0c08-76c4-b6ae-284039bb6f82",
  type: "page-type/story-turn-played",
  slug: "overwhere-iii-00-071",
  cover: "image/image-83d177f14533ea99",
  ownLength: 139,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iii"],
  position: 71,
  prose: "txt",
  characters: ["character-player/overwhere-iii-nala", "character-other/overwhere-iii-marda-hesk"],
  stepStatus: "step-status/player",
  action:
    "“Just curious, was thinking through things I read. What about traits? How are those different than skills?”",
  beats: "jsonl",
  lore: [
    "lore/overwhere-iii-marda-hesk",
    "lore/overwhere-iii-nala",
    "lore/overwhere-iii-nala-2",
    "lore/overwhere-iii-nala-3",
    "lore/overwhere-iii-the-system",
    "place/overwhere-iii-merrowgate-guild-post",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/memory",
    "story-recorder/picture",
    "story-recorder/mechanics",
  ],
  endsAt: "2026-10-07T11:40:00.000Z",
  coverAfter: '"Never heard of one rising in days." She taps her cane once on the floor,',
} as const satisfies StoryTurnPlayed
