import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIv00036 = {
  id: "01a0f420-ed12-7409-a27e-30933eda3ef0",
  type: "page-type/story-turn-played",
  slug: "overwhere-iv-00-036",
  ownLength: 67,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iv"],
  position: 36,
  prose: "txt",
  characters: ["character-player/overwhere-iv-nala", "character-other/overwhere-iv-ilsa-crane"],
  stepStatus: "step-status/recorders",
  action: "“Sure, what’s up?”",
  beats: [
    '"Sure," Nala says, turning back to the counter. "What\'s up?"',
    "Ilsa glances past her at the door, then takes the pencil from her hair and turns it in her fingers.",
    '"That black line Dace spoke of," she says quietly. "The one that cut your runner in two."',
    'She sets the pencil down and meets Nala\'s eyes. "Is that the same thing that lit my crystal clear?"',
  ],
  lore: ["lore/overwhere-iv-ilsa-crane", "lore/overwhere-iv-nala", "lore/overwhere-iv-nala-2"],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: ["story-recorder/inventory", "story-recorder/memory"],
  endsAt: "2026-10-01T15:49:00.000Z",
} as const satisfies StoryTurnPlayed
