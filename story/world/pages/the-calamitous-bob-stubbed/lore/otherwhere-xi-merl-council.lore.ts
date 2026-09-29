import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiMerlCouncil = {
  id: "01a0ea86-abe6-7a52-86ff-d8cfef680e6e",
  type: "page-type/lore",
  slug: "otherwhere-xi-merl-council",
  title: "The Merl Council of Sikoua",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-organization/otherwhere-xi-merl-council",
  facts: [
    {
      fact: "The merl council governs Sikoua, the merl capital hidden in a pit in the Deadshield Woods.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Sikoua\'s name means "peace at last" in the merl tongue.',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A shaman leads the merl council; old Tweek leads it now.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An arch in Sikoua lists the names of the merls' dead elders.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The merls left Glastia in an exodus after its council used them as fodder on the wall.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The merls honour Sidjin the Red Mist as their saviour with a statue in Sikoua.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The merls hate the beastlings, who killed many of their people.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The merls of Sikoua pledged to fight for the alliance against Oleander.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Merl war spiders and siege tarantulas fight beside merl archers.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A merl enclave in the Deadshield Woods trades silk and fruit to Harrak for metal.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
