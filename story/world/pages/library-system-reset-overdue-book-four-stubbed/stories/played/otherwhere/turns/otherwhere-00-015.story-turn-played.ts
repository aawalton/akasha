import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00015 = {
  id: "01a0e496-745a-7809-8f3b-2411a6882500",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-015",
  ownLength: 193,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 15,
  prose: "txt",
  characters: [
    "character-player/otherwhere-alan",
    "character-other/otherwhere-links",
    "character-other/otherwhere-engorged-bookworm-01",
  ],
  turnStatus: "turn-status/recorders",
  action: "I push it over onto the salt and hold it there",
  beats: [
    "She drops down and grabs the bookworm behind its head, where the salt has dried its skin rough.",
    "It's easy to grip, like coarse sandpaper, and she shoves it over sideways onto the heap of salt.",
    "It lands in the salt and she leans her weight on it, pinning it there.",
    "It shrieks and thrashes; the salt hisses against its skin, and the puckering spreads fast.",
    "Its whole body is shrinking now, wrinkled grey drawing in along its length.",
    "It twists its mouth end round against her grip, and its teeth nip her forearm.",
    "The nip is shallow, a stinging scrape, but it makes her hiss through her teeth.",
    "She keeps her weight on it, and keeps it pressed down in the salt.",
    "Its thrashing is weaker now, slower, but it isn't still yet.",
    "Its skin crackles faintly under her palms as the salt goes on drying it.",
  ],
  lore: ["place/otherwhere-main-hall"],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
} as const satisfies StoryTurnPlayed
