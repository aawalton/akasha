import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiOlzTheClaw = {
  id: "01a0ea84-2829-7e63-96a9-e13362a6c3a5",
  type: "page-type/lore",
  slug: "otherwhere-xi-olz-the-claw",
  title: "Olz the Claw",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-olz-the-claw",
  facts: [
    {
      fact: "Olz the Claw is a warchief of the beast-skinned southern tribes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Olz took command of the southerners when Cloud Skull died at the Baranese pass.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Southern warchiefs win their place by wrestling.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Olz leads the southern tribes in the wild lands.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
