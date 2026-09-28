import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIvAshForest = {
  id: "01a0ea0e-7157-7012-a509-da336c66249a",
  type: "page-type/place",
  slug: "otherwhere-iv-ash-forest",
  title: "The Ash Forest",
  world: "world/beware-of-chicken",
  within: "place/otherwhere-iv-azure-hills",
  facts: [
    {
      fact: "The Ash Forest lies north of the Grass Sea, over 200,000 square li of steep slopes and ravines.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Ash Forest is the home of the Blaze Bears, who call it Home.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Ash Forest's ancient trees once grew as tall as towers before lost Qi stunted them.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Shady Glade is a human village near the Ash Forest.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
