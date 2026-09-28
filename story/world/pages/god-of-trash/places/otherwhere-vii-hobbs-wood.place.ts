import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereViiHobbsWood = {
  id: "01a0ea3e-8161-7398-8521-7513c1203f98",
  type: "page-type/place",
  slug: "otherwhere-vii-hobbs-wood",
  title: "Hobb's Wood",
  world: "world/god-of-trash",
  facts: [
    {
      fact: "Hobb's Wood is old oak and beech woodland a mile north of Ashford, climbing into hills.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ashford folk gather firewood, mushrooms and nuts at the wood's edge and go no deeper.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Mana is thicker in the deep wood than in the fields, and herbs there glow faintly.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Gold-furred mana squirrels live in the deep wood, quick and hard to catch.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A red-eyed mana boar, Tier 1, roots in the deep wood and charges anything near its sounder.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Wolves come down into the wood when the snows begin, not before.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Old Sef, a charcoal burner, lives in a turf hut in a clearing half a mile in.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Old Sef is deaf in one ear, kindly, and knows the wood's herbs by sight but not their worth.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A clear stream runs out of the wood past Sef's clearing, safe to drink.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Three deserters from the eastern war camp in a hollow deep in the wood, hungry and armed.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
