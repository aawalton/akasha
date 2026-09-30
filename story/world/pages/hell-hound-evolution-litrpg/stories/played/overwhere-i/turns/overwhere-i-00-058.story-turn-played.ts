import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00058 = {
  id: "01a0f47d-cc5c-7cee-b434-1e89d1765849",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-058",
  ownLength: 163,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 58,
  prose: "txt",
  characters: ["character-player/overwhere-i-nala"],
  stepStatus: "step-status/recorders",
  action:
    "“Oh drat. I left it on the island. If you come back with me to get it, I’ll cut you in for a gold. That thing looked annoyingly heavy.”",
  beats: [
    'Rowan nods at once. "I\'ll c-come. But not tonight."',
    "He glances west, where the light is going gold over the reeds.",
    '"After dark the fen belongs to the pack, and worse. And I wade too slow to be out by dusk."',
    '"First light tomorrow. We\'ll have the head before the scavengers do."',
    'He shakes his head at the gold, stammering. "No. Sedge\'s name cleared is p-pay enough."',
    "\"I'll bring a hatchet, rope, and the reed sled I drag charcoal on. It'll carry the head.\"",
    "\"Sedge'll come too. It won't like the carcass, but it knows the firm ground better than I do.\"",
    'He hitches his coat and nods toward the palisade. "Will you let me walk you in?"',
    '"I\'d like to tell them at the Stag myself: Sedge never killed their stock."',
  ],
  lore: [
    "lore/overwhere-i-nala",
    "lore/overwhere-i-nala-2",
    "lore/overwhere-i-rowan-coalby",
    "lore/overwhere-i-starfall-legacy",
    "lore/overwhere-i-starfall-legacy-2",
    "lore/overwhere-i-the-greyfen-alpha-2",
    "place/overwhere-i-the-greyfen",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  endsAt: "2026-10-01T16:35:00.000Z",
} as const satisfies StoryTurnPlayed
