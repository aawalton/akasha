import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiDarkScaledStalker = {
  id: "01a0ea83-059e-7ad0-8036-ba014fed328a",
  type: "page-type/lore",
  slug: "otherwhere-xi-dark-scaled-stalker",
  title: "Dark-Scaled Stalker",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-species/otherwhere-xi-dark-scaled-stalker",
  facts: [
    {
      fact: "A dark-scaled stalker is a big black lizard shaped much like a monitor.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A dark-scaled stalker cloaks itself in black mana to stalk its prey unseen.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Dark-scaled stalkers lurk in the Deadshield Woods near the lone Hollow Mountain.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
