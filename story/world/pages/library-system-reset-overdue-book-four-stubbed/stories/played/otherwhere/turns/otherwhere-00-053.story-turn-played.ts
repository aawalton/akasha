import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00053 = {
  id: "01a0e7b8-92d7-703a-b71e-3813fdab699e",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-053",
  ownLength: 115,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 53,
  prose: "txt",
  characters: ["character-player/otherwhere-alan"],
  turnStatus: "turn-status/reviewers",
  action:
    "I take another few minutes to relax after the climax, then clean up, dry off, put on a robe, and go looking for a meal",
  beats: [
    "Nala lies a few more minutes in the cooling water, loose and warm through, before climbing out.",
    "She pulls the plug, dries on a thick linen towel, and takes a second blue robe from the wardrobe.",
    "It smells of cedar and hangs long; her slippers are out by the gloom, so she goes barefoot.",
    "She crosses the hall's dim gold to the arched door and follows the short corridor to the kitchen.",
    "The kitchen is warm from the great oven, and a honey-glazed loaf still sits on the oak table.",
    "Her stomach growls; she opens the pantry on jars of honey and bins of roots and vegetables.",
  ],
  lore: ["place/otherwhere-main-hall"],
} as const satisfies StoryTurnPlayed
