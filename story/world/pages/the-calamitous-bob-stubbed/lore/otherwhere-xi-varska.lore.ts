import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiVarska = {
  id: "01a0ea7c-2010-777e-b192-1bf4f32e10bb",
  type: "page-type/lore",
  slug: "otherwhere-xi-varska",
  title: "Varska",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-varska",
  facts: [
    {
      fact: "Varska was a witch of Kazar, Viv's first mentor and lover.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Varska is dead, killed alone and heroically by an Enorian siege company.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Varska was exiled from Helock.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Varska's sister is Ereska of Saref, who was Viv's roommate at the Academy.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Varska lived in Kazar's mage tower before Viv.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Varska made Viv's old robe and gave her a sound enchantment.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Varska's signature spell was the Ballista, a hail of stone spears.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Varska's tomb is at Min Goles, marked with a Suncult Marea flower.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
