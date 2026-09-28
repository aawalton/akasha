import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00040 = {
  id: "01a0e560-408c-72dc-a3f1-008ca86b4626",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-040",
  cover: "image/image-81ab5fd0f32800d7",
  ownLength: 109,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 40,
  prose: "txt",
  characters: ["character-player/otherwhere-alan"],
  turnStatus: "turn-status/player",
  action: "I take a loaf, and then eat chunks of it while I walk around to explore.",
  beats: [
    "Nala takes a loaf and tears off a chunk: the bread is dense and nutty, its crust glazed in honey.",
    "Eating as she goes, she wanders the kitchen under the hanging copper pots.",
    "A wide door opens onto a long staff dining hall, dim, its tables under dust sheets.",
    "At the kitchen's far end, beside the great oven, is a low door; she ducks through it.",
    "It is a pantry: jars of honey on the shelves, bins of roots and vegetables along the wall.",
    "Stacked in the corner are a dozen sacks of coarse salt, each about twenty pounds.",
  ],
  lore: ["place/otherwhere-kitchen"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/memory", "story-recorder/mechanics", "story-recorder/picture"],
} as const satisfies StoryTurnPlayed
