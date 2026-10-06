import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const encounters0005BothBetsCount = {
  id: "01a1138b-a8ec-79cc-bb41-99dd7f946f6c",
  type: "page-type/story-chapter-written",
  slug: "encounters-0005-both-bets-count",
  position: 5,
  unit: "unit/words",
  title: "Both Bets Count",
  story: "story-written/encounters",
  ownLength: 5312,
  prose: "txt",
  stepStatus: "step-status/recorders",
  beats: "jsonl",
  lore: [
    "lore/encounters-hana",
    "lore/encounters-kenzie",
    "lore/encounters-priya",
    "lore/encounters-sofia",
    "lore/encounters-sofia-2",
    "lore/encounters-sofia-3",
    "place/encounters-cabana-bay-room",
  ],
  characters: [
    "character-player/encounters-alan",
    "character-other/encounters-sofia",
    "character-other/encounters-kenzie",
    "character-other/encounters-priya",
    "character-other/encounters-hana",
  ],
  recordedBy: ["story-recorder/inventory", "story-recorder/plan", "story-recorder/mechanics"],
} as const satisfies StoryChapterWritten
