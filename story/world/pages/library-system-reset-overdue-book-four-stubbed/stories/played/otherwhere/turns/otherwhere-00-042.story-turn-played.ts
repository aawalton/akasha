import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00042 = {
  id: "01a0e571-917d-7c47-aa1f-ced68c5db433",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-042",
  ownLength: 143,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 42,
  prose: "txt",
  characters: ["character-player/otherwhere-alan"],
  turnStatus: "turn-status/game-master",
  action: "I run back to the entrance and get another bag and repeat the process.",
  beats: [
    "Nala drags herself up, aching, and runs back to the edge of the gloom for another sack.",
    "She hugs it to her chest; the honey-salt crust has held, though flakes fall as she moves.",
    "Behind her the worm's teeth split the lodged sack; it gapes wide, gagging up gouts of salt.",
    "She runs straight at the open mouth and rams the second sack in deep.",
    "This time she lets go at once and springs back, and the thrash only clips her on the way.",
    "Even a clip from that bulk jars her whole body; she stumbles, hurting badly now.",
    "The worm convulses, the salt burning deep in its gullet; its grey hide puckers and cracks.",
    "Its thrashing slows and its huge length sags, but it is still alive.",
  ],
  issues: ['"But it is still alive." - Leave It Open'],
  lore: ["place/otherwhere-hall-back"],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
} as const satisfies StoryTurnPlayed
