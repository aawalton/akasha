import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereIv00013 = {
  id: "01a0eab4-4d11-764e-8033-b9e831344637",
  type: "page-type/story-turn-played",
  slug: "otherwhere-iv-00-013",
  cover: "image/image-6d39a08dde0a6649",
  coverAfter: "The hand comes down. For a moment he stands quiet, looking at",
  ownLength: 437,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-iv"],
  position: 13,
  prose: "txt",
  characters: ["character-player/otherwhere-iv-nala", "character-other/otherwhere-iv-zhao-jun"],
  stepStatus: "step-status/player",
  action:
    '"I\'m afraid I am new to the lands. You would know better than I. Based on the targeting nature of the damage, only affecting Zhao Jun, I would have expected humans as the source, were it not for the tracks. A mortal beast I would not expect to forage the same place every time. However, spirit beasts can have unusual behavior, though they are far more rare. So you have two options, the likely behavior from an unlikely source or the unlikely behavior from a likely source. I cannot tell you which it is in this case, but it would be wise to be ready for both."',
  beats: "jsonl",
  lore: ["lore/otherwhere-iv-boar-hunt", "place/otherwhere-iv-upstream-woods"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/mechanics", "story-recorder/memory", "story-recorder/picture"],
  endsAt: "2026-09-28T19:34:00.000Z",
} as const satisfies StoryTurnPlayed
