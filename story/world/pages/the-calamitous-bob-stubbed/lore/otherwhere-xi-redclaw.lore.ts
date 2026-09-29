import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiRedclaw = {
  id: "01a0ea85-0b86-7c2d-9c1b-eabe8c30e257",
  type: "page-type/lore",
  slug: "otherwhere-xi-redclaw",
  title: "Redclaw",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-redclaw",
  facts: [
    {
      fact: "Lord Redclaw is a noble mage of Glastia whose house bears a red claw.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Redclaw's house backed Prince Medjin, Sidjin's enemy.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Redclaw is in Glastia, his faction weakened by Medjin's death.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
