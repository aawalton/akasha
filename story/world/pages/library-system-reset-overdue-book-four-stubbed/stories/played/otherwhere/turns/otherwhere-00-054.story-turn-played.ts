import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00054 = {
  id: "01a0e7c0-a191-785f-9949-92d701e75c52",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-054",
  cover: "image/image-a8bd2711c809a3ee",
  ownLength: 163,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 54,
  prose: "txt",
  characters: ["character-player/otherwhere-alan", "character-other/otherwhere-links"],
  turnStatus: "turn-status/recorders",
  action:
    "I take the loaf four now and eat it while I collect the clothes I left In the hall, put on what I’m missing, and take the extra robe back to my room. **Okay Links, you need more power. How do we get it for you?**",
  beats: [
    "Nala tears into the honey-glazed loaf, dense and nutty, and eats as she walks back into the hall.",
    "At the gloom's edge her first robe, belt, pouch and slippers lie by the honey jar.",
    "She buckles on the belt and pouch and steps into the felt slippers, a crust still in her teeth.",
    "She folds the spare robe over her arm, walks it back to the quarters and hangs it in the wardrobe.",
    "She aims a thought at Links: he needs more power, so how do they get it for him?",
    'Links: "Put my books back. Every book returned to its right shelf is a point."',
    'His eyes flicker blue: "Some three thousand lie about the hall. Spine marks match shelf marks."',
    'Links: "Eight books and your taps run hot. Patrons pay a point each too, once the counter works."',
  ],
  lore: ["lore/otherwhere-universe", "place/otherwhere-main-hall"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/mechanics", "story-recorder/picture"],
} as const satisfies StoryTurnPlayed
