import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiInquisitionOfNeriad = {
  id: "01a0ea7f-9217-703b-bef4-65aba7cfc495",
  type: "page-type/lore",
  slug: "otherwhere-xi-inquisition-of-neriad",
  title: "The Inquisition of Neriad",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-organization/otherwhere-xi-inquisition-of-neriad",
  facts: [
    {
      fact: "The inquisitors of Neriad detect lies and cannot tell falsehoods themselves.",
      knowers: ["lore-disclosure/game-master"],
    },
    { fact: "Inquisitors can see shadow on a soul.", knowers: ["lore-disclosure/game-master"] },
    {
      fact: "Inquisitors are rumored to read the memories of the dead.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Inquisitors may interrogate with a violent golden light.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The merciless golden light of the inquisition exposes lies.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Inquisitors witness councils to vouch for honesty.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Inquisitors punish prisoners who knowingly aided the enemy.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The High Inquisitor had his seat in Mornyr.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Religious martial orders back the inquisition.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Angry gods can scorch a guilty bloodline in holy fire.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Using inquisitorial interrogation on a sovereign would be a declaration of war.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
