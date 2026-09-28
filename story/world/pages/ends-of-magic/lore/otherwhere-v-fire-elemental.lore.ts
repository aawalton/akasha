import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVFireElemental = {
  id: "01a0e9fd-5ace-7724-83cf-f3a777310f8a",
  type: "page-type/lore",
  slug: "otherwhere-v-fire-elemental",
  title: "Fire Elemental",
  world: "world/ends-of-magic",
  about: "world-species/otherwhere-v-fire-elemental",
  facts: [
    {
      fact: "Fire elementals are raging infernos that want only to devour.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Fire elementals are mindless, unlike the thinking elemental-folk.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A fire elemental haunts a mountain pass above Halsmet.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: '"Spitting on a fire elemental" means a useless, futile act.',
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
