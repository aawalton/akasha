import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIxKessenhold = {
  id: "01a0ea3e-eab0-7390-ab20-480a1ce10fbe",
  type: "page-type/place",
  slug: "otherwhere-ix-kessenhold",
  title: "Kessenhold",
  world: "world/mana-devourer-litrpgmana-cultivation",
  facts: [
    {
      fact: "Kessenhold is the Kessen Zone's chartered city, nine days east of Tollmere.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Kessenhold is a walled city of grey stone and slate roofs on a slow river.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Orrow Trading House has its seat in Kessenhold's Charter Hall.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Halvard's great counting-temple rises over Kessenhold's market square.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Kessenhold has a slave market where the unclaimed are sold by weight of their papers.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Kessenhold keeps a small arena pit; its best fighters are sold east to greater arenas.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Kessenhold has smiths, an enchanter or two, alchemists and a hunters' hall.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Eastward caravans leave Kessenhold for the barrier gates toward the great zones.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
