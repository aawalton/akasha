import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereVii00003 = {
  id: "01a0ea43-56c6-7111-a82e-6292a39224f6",
  type: "page-type/story-turn-played",
  slug: "otherwhere-vii-00-003",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-vii"],
  position: 3,
  stepStatus: "step-status/game-master",
  action:
    "\"A bit of both I'm afraid. Certainly didn't plan to end up in a ditch with only the clothes on my back. You look like an enterprising fellow, could you use an extra pair of hands in exchange for a meal? I know I don't look like much, but I'm good at cleaning and organizing, might be able to help you turn some of those treasures into something people would buy?\"",
  lore: [
    "lore/otherwhere-vii-ennis",
    "lore/otherwhere-vii-money",
    "lore/otherwhere-vii-mages-and-mortals",
    "place/otherwhere-vii-ashford",
    "place/otherwhere-vii-bramwick",
    "place/otherwhere-vii-ashford-road",
  ],
} as const satisfies StoryTurnPlayed
