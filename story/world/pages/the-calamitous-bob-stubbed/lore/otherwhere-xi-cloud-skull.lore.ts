import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiCloudSkull = {
  id: "01a0ea7a-6439-7d1c-9664-6caf52beebfc",
  type: "page-type/lore",
  slug: "otherwhere-xi-cloud-skull",
  title: "Cloud Skull",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-cloud-skull",
  facts: [
    {
      fact: "Cloud Skull was a warchief of the southern tribes, who wrestle for the right to lead.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Cloud Skull's aura wove a web that repelled mana, making him near immune to magic.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Cloud Skull led the southerners in the alliance against Halluria and the Nemeti at the pass.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Cloud Skull died facing the Nemeti on the second day at the pass; he is dead.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Olz the Claw succeeded Cloud Skull as warchief of the southerners.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
