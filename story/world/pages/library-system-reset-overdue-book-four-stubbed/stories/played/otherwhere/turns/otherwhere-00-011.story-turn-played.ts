import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00011 = {
  id: "01a0e401-d650-7eb9-bdf2-938766b02965",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-011",
  ownLength: 331,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 11,
  prose: "txt",
  characters: ["character-player/otherwhere-alan", "character-other/otherwhere-links"],
  turnStatus: "turn-status/recorders",
  action:
    "I go and get the salt and carry the full box if I can to outside the room where the bookworms are. Then I go back to the break room to see if I can find a container I could use to scoop and throw the salt.",
  beats: [
    "She goes to find the break room; its door opens off the left side of the hall, partway back.",
    "Inside, a dead magical cooler stands dark in one corner, its door hanging open.",
    "Glass terrariums line the walls, their little gardens run wild, pressed green against the glass.",
    "In the cupboards she finds the salt: a big box, heavy, near twenty pounds.",
    "She hugs it in both arms and carries it out, the weight pulling at her shoulders.",
    "She carries it back along the columns toward the rear of the hall, the chewing growing louder.",
    "Where the gold light thins into gloom, she sets the box down on the floor.",
    "From there she can make out low shapes in the dark ahead, humped among heaps of books, moving.",
    "The nearest is about the size of a small dog; the others are hard to make out in the gloom.",
    "None of them turn toward her; the chewing goes on.",
    "Links pads up beside the box and eyes it, then her, and says nothing.",
    "She goes back to the break room to hunt for something to scoop and throw with.",
    "The cupboards turn up chipped mugs, a small bucket, and a dented tin scoop.",
    "She takes the scoop; it fits her hand, deep enough for a good fistful of salt.",
  ],
  lore: ["place/otherwhere-main-hall"],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
} as const satisfies StoryTurnPlayed
