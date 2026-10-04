import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00122 = {
  id: "01a10720-9ed9-7f1c-af2f-89589237cf9c",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-122",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 122,
  stepStatus: "step-status/mechanics",
  action:
    "“Fine. A bit boring, but should be fast.” I head out right away, talking to merchants on the way for clues as to where the rest might be.",
  beats: "jsonl",
  lore: [
    "lore/overwhere-i-the-deserter-crew-2",
    "lore/overwhere-i-the-deserter-crew-3",
    "lore/overwhere-i-the-deserter-crew-4",
    "place/overwhere-i-greyback-and-east-road",
  ],
  recordedBy: ["story-recorder/inventory", "story-recorder/mechanics"],
  endsAt: "2026-10-07T14:28:00.000Z",
} as const satisfies StoryTurnPlayed
