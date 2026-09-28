import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00048 = {
  id: "01a0e59c-5708-7dde-bb41-3b89016c7f70",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-048",
  ownLength: 122,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 48,
  prose: "txt",
  characters: ["character-player/otherwhere-alan"],
  turnStatus: "turn-status/recorders",
  action:
    "I run back to the entrance for another sack, instead of going for the one between us, then commit to pushing it down its throat.",
  beats: [
    "Nala leaves the sack on the floor and runs for the gloom's edge.",
    "The worm follows her honey smell, heaving along, but slower than she can run.",
    "She snatches up one of the two fresh sacks and turns as it comes at her.",
    "It arrives mouth first, and she commits, driving the sack straight at its throat.",
    "At the last instant it jerks its head away; the sack tears on its teeth and bursts in its mouth.",
    "Salt sprays over its lips and tongue; the worm bucks, gagging and shrieking.",
    "It lunges back at her blindly; she throws herself sideways and it hits only floor.",
    "The worm reels, spitting salt, burned but not dry, its body still heaving.",
  ],
  lore: ["place/otherwhere-hall-back"],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: ["story-recorder/mechanics"],
} as const satisfies StoryTurnPlayed
