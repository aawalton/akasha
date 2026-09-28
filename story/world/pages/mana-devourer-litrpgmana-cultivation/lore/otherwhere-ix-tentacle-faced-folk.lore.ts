import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxTentacleFacedFolk = {
  id: "01a0ea38-0c4d-723a-8de1-3f0521f93af8",
  type: "page-type/lore",
  slug: "otherwhere-ix-tentacle-faced-folk",
  title: "Tentacle-faced folk",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-species/otherwhere-ix-tentacle-faced-folk",
  facts: [
    {
      fact: "Tentacle-faced folk are purple-skinned humanoids with a cluster of tentacles on the face.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Outsiders know no common name for their kind and describe them by their facial tentacles.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "One of their kind keeps the armoury desk beneath the Sun City arena and opens its gate grate.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "That guard is deadpan and indifferent, and asks “you got money?” before doing any favour.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He sees summoned fighters as doomed: “Something heavy if you wanna die quickly.”",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
