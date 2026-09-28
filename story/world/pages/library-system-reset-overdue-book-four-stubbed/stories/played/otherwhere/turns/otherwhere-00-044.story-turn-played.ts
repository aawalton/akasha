import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00044 = {
  id: "01a0e581-073b-78de-95a5-672559a566f8",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-044",
  ownLength: 61,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 44,
  prose: "txt",
  characters: ["character-player/otherwhere-alan", "character-other/otherwhere-links"],
  turnStatus: "turn-status/recorders",
  action: "“How much more salt does that thing need to go down?”",
  beats: [
    "Flat on her back by the honey jar, Nala asks Links how much more salt the thing needs to go down.",
    "Links looks back into the gloom, where the worm still rolls and gags, before he answers.",
    '"One more sack, deep in its gullet, and it dries out," he says. "On its hide, far more than that."',
  ],
  lore: ["place/otherwhere-hall-back"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/memory", "story-recorder/mechanics"],
} as const satisfies StoryTurnPlayed
