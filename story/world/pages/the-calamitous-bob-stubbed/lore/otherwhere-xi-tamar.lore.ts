import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiTamar = {
  id: "01a0ea89-57b6-7edf-a3e7-ca13e9adb6c6",
  type: "page-type/lore",
  slug: "otherwhere-xi-tamar",
  title: "Tamar",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-tamar",
  facts: [
    {
      fact: "Lord Tamar was the court archmage of Enoria's royalists.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tamar is dead, killed by Solfis in Helock.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tamar cast blue, brown and red mana.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tamar's inspection read: Court archmage, advisor and potent caster, very dangerous.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tamar blamed Viv for the royalists' fall.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tamar believed outlanders are carried through impossible odds by outlandish fate.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tamar paid for the hit on Sidjin, and ambushed Viv in Helock the night the flour warehouse blew.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
