import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiDarkBlades = {
  id: "01a0ea81-c315-7a2a-9c45-9a67e4f76d5d",
  type: "page-type/lore",
  slug: "otherwhere-xi-dark-blades",
  title: "The Dark Blades",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-organization/otherwhere-xi-dark-blades",
  facts: [
    {
      fact: "The Dark Blades, or Black Blades, are the trained killers of the northern cities, based in Luten.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Dark Blades walk the path of assassination and sabotage and are trained to kill kark.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Dark Blades are tied to the Pure League.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In the steppes war Luten sent some fifty Dark Blades against Harrak; all but one died.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Shon, the lone surviving Dark Blade, was spared to carry a message and has months to live.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Luten cannot field Dark Blades again for a generation.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Dark Blades wielded the Dark Blade, a cursed obsidian-linked sword that eats unworthy wielders.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The dragon Arthur dropped the Dark Blade into the volcano of Regnos.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Renegade Dark Blades with burnt-off symbols ambushed the rulers of Zazas outside Mornyr.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
