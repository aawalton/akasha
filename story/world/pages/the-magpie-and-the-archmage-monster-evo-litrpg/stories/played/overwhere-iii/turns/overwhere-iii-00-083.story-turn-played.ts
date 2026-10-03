import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIii00083 = {
  id: "01a0ff4f-5c30-721d-8433-60f2b88db975",
  type: "page-type/story-turn-played",
  slug: "overwhere-iii-00-083",
  cover: "image/image-3af1238147ed7b90",
  ownLength: 297,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iii"],
  position: 83,
  prose: "txt",
  characters: [
    "character-player/overwhere-iii-nala",
    "character-other/overwhere-iii-mother-sallow",
    "character-other/overwhere-iii-edda-crane",
  ],
  stepStatus: "step-status/player",
  action:
    "I use my my legendary Mana Weaver trait to pull ALL the natural weaves in the area into a tight knot right where the woman is, not trying to make a clean weave, instead trying to make the conflict on purpose to trigger a desperate explosion or chain reaction.",
  beats: "jsonl",
  lore: [
    "lore/overwhere-iii-cleansing-weave",
    "lore/overwhere-iii-current-knot",
    "lore/overwhere-iii-edda-crane",
    "lore/overwhere-iii-mother-sallow",
    "lore/overwhere-iii-nala",
    "lore/overwhere-iii-nala-2",
    "lore/overwhere-iii-nala-3",
  ],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/memory",
    "story-recorder/mechanics",
    "story-recorder/picture",
  ],
  endsAt: "2026-10-08T13:35:00.000Z",
  coverAfter:
    "The knot bursts with a boom that rolls away down the brook. The shield tears apart like wet paper.",
} as const satisfies StoryTurnPlayed
