import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00045 = {
  id: "01a0f3f3-9c71-720c-aed3-82a0b6a6fb6b",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-045",
  cover: "image/image-068e5c8d00a75436",
  ownLength: 142,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 45,
  prose: "txt",
  characters: ["character-player/overwhere-i-nala"],
  stepStatus: "step-status/player",
  action:
    "I drop my working and stay still while my mana recharges to full, keeping a watch with natural vision for any of the wolves to come in my direction.",
  beats: [
    "Nala lets the two lenses fall back into water and spill away between the alder roots.",
    "She settles low against a grey trunk and keeps still, the west wind cool on her face.",
    "Bare-eyed, the island's east edge is a dark line of pines, the pack grey specks in its shade.",
    "She can tell when a speck moves, but not which wolf it is.",
    "Midday heat hums over the fen; frogs creak in the reeds below the rise.",
    "Her mana fills back in slow tides, ten minutes at a time.",
    "The specks stay in the shade through the hot hour.",
    "By half past twelve she is full, and her legs are rested from the morning's wading.",
    "The watching speck stands, and another rises out of the pack to take its place.",
  ],
  lore: ["lore/overwhere-i-nala", "lore/overwhere-i-nala-2", "lore/overwhere-i-the-greyfen-alpha"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/memory",
    "story-recorder/mechanics",
    "story-recorder/picture",
  ],
  endsAt: "2026-10-01T12:30:00.000Z",
} as const satisfies StoryTurnPlayed
