import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereV00006 = {
  id: "01a0ea31-818d-786b-934c-7cb8f3d873ac",
  type: "page-type/story-turn-played",
  slug: "otherwhere-v-00-006",
  ownLength: 236,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-v"],
  position: 6,
  prose: "txt",
  characters: ["character-player/otherwhere-v-nala"],
  stepStatus: "step-status/recorders",
  action:
    "I turn and catch the jaws with my hands, then wrap my thighs around it's neck and squeeze the breath out of it.",
  beats: [
    "Nala tries to twist round in the log's mouth, to get her hands on its jaws.",
    "The roots hem her shoulders in; the weight on her back pins her hips to the ground.",
    "She gets half round. One hand finds fur, a hard cheek, the hot wet edge of a lip.",
    "Her fingers have no strength left in them; they slide off.",
    "She never gets her legs free to lock them round its neck.",
    "The jaws open and close a third time, deep in the side of her neck.",
    "The pain goes very far away.",
    "The dry, rot-smelling dark in front of her face goes darker, and then there is nothing.",
    "She does not feel it drag her out of the log's mouth and up the slope into the ferns.",
    "She does not wake.",
    "Nala dies there in the ferns above the hollow, on her first night in Davrar.",
  ],
  lore: ["lore/otherwhere-v-gloamcat", "lore/otherwhere-v-injury"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/mechanics", "story-recorder/memory"],
  endsAt: "2026-09-28T19:10:00.000Z",
} as const satisfies StoryTurnPlayed
