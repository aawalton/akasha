import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiUton = {
  id: "01a0ea8b-9d76-73f8-9c8a-5161fcfe6fad",
  type: "page-type/lore",
  slug: "otherwhere-xi-uton",
  title: "Uton",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-uton",
  facts: [
    {
      fact: "Warlord Uton is a warlord of Halluria, named in General Jaratalassi's war tales.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Hallurian warlords rule clans of laborers, militia, warborn and faceless mages.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
