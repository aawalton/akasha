import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIv00087 = {
  id: "01a10180-a29b-7ea3-aa9f-cbc6419c7347",
  type: "page-type/story-turn-played",
  slug: "overwhere-iv-00-087",
  cover: "image/image-7735a8cee68049f2",
  ownLength: 178,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iv"],
  position: 87,
  prose: "txt",
  characters: ["character-player/overwhere-iv-nala"],
  stepStatus: "step-status/player",
  action:
    "I decide I’m feeling rested enough and work my way back to where I killed them goblins, keeping my senses wide for more.",
  beats: "jsonl",
  lore: [
    "lore/overwhere-iv-millbrook-adventurers-hall-2",
    "lore/overwhere-iv-nala",
    "lore/overwhere-iv-nala-2",
    "lore/overwhere-iv-nala-3",
    "lore/overwhere-iv-the-tangle-2",
    "lore/overwhere-iv-the-tangle-3",
    "place/overwhere-iv-millbrook-adventurers-hall",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/mechanics",
    "story-recorder/memory",
    "story-recorder/picture",
  ],
  endsAt: "2026-10-07T09:55:00.000Z",
  coverAfter: "A breeze comes down the cleft, carrying a faint smell of woodsmoke",
} as const satisfies StoryTurnPlayed
