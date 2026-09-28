import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVSoulMagic = {
  id: "01a0e9fa-7a12-714c-8479-698c41bbd172",
  type: "page-type/lore",
  slug: "otherwhere-v-soul-magic",
  title: "Soul Magic",
  world: "world/ends-of-magic",
  about: "world-mechanic/otherwhere-v-soul-magic",
  facts: [
    {
      fact: "A living soul can be transferred into an empty golem core.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Mages of Giantsrest threaten defiant captives with a soul bound into a golem core.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Soul eaters are counted among the great evils that plague Davrar.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Oath blessings of divinity can anchor a person's will to Davrar until a vow is kept.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
