import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00076 = {
  id: "01a0fd94-8679-7a8e-9160-938e14f7dad2",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-076",
  cover: "image/image-36fe67fdbd05d1b5",
  coverAfter: "Behind your boulders you dig the two pale blue crystals out of",
  ownLength: 106,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 76,
  prose: "txt",
  characters: ["character-player/overwhere-i-nala"],
  stepStatus: "step-status/player",
  action:
    "I pull out the pale blue crystals and pull on them, to see if I can use them to refill my mana.",
  beats: [
    "Behind her boulders Nala takes the two pale blue crystals from her pack, cold in her bare hand.",
    "They hum faintly against her; she wills herself to draw on the first.",
    "Mana seeps into her, a steady filling she knows without seeing; in half a minute it is dry.",
    "The crystal crumbles to dust between her fingers.",
    "She draws the second the same way, and it too crumbles; her reserve is the fuller for both.",
    "As she draws, a man groans somewhere in the galleries.",
    "Another voice hisses him quiet.",
  ],
  lore: [
    "lore/overwhere-i-nala",
    "lore/overwhere-i-nala-2",
    "lore/overwhere-i-the-deserter-crew-2",
    "lore/overwhere-i-the-system-2",
    "lore/overwhere-i-the-western-march",
  ],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/mechanics",
    "story-recorder/memory",
    "story-recorder/picture",
  ],
  endsAt: "2026-10-03T15:11:00.000Z",
} as const satisfies StoryTurnPlayed
