import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIv00093 = {
  id: "01a101db-f7f8-7eaa-984d-b365b3be7a2b",
  type: "page-type/story-turn-played",
  slug: "overwhere-iv-00-093",
  cover: "image/image-1a4fea594c9b7af7",
  ownLength: 104,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iv"],
  position: 93,
  prose: "txt",
  characters: ["character-player/overwhere-iv-nala"],
  stepStatus: "step-status/player",
  action:
    "I sneak out to where the goblins are, stab one through the neck with my spear, then turn and run to the ambush site.",
  beats: [
    "Nala slips forward through the brush toward the two scouts, spear low, meaning to strike close.",
    "Twenty paces. Her boot sinks into a hollow of dead leaves, and they crunch.",
    "The nearer scout freezes, head snapping toward her. Its eyes find her among the bushes.",
    "It shrieks, high and piercing, and skips back out of spear reach, knife up.",
    "The second scout takes up the shriek and melts back behind a trunk.",
    "Up the trail the muttering breaks into a roar. Feet pound. Branches crack.",
    "The whole file is coming down the trail at her at a run, the heavy tread pounding among them.",
  ],
  lore: [
    "lore/overwhere-iv-nala",
    "lore/overwhere-iv-nala-2",
    "lore/overwhere-iv-nala-3",
    "lore/overwhere-iv-the-tangle-2",
    "lore/overwhere-iv-the-tangle-2-2",
    "place/overwhere-iv-tull-farm",
  ],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/mechanics",
    "story-recorder/memory",
    "story-recorder/picture",
  ],
  endsAt: "2026-10-08T08:47:00.000Z",
  coverAfter: "The whole file is coming down the trail at you at a run,",
} as const satisfies StoryTurnPlayed
