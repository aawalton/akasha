import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIvPlumBlossomsShadow = {
  id: "01a0ea09-da11-799a-ae83-e5177ecab5a8",
  type: "page-type/lore",
  slug: "otherwhere-iv-plum-blossoms-shadow",
  title: "The Plum Blossom's Shadow",
  world: "world/beware-of-chicken",
  facts: [
    {
      fact: "The Plum Blossom's Shadow is an information brokerage sympathetic to the Azure Heroes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Plum Blossom's Shadow's leader is known only as Master Scribe.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Plum Blossom's Shadow agents wear plum-blossom-marked robes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Plum Blossom's Shadow uses coded ciphers and jamming crystals against enemy transmissions.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
