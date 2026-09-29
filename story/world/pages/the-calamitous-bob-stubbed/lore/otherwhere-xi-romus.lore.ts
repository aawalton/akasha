import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiRomus = {
  id: "01a0ea85-0b86-7060-9362-acc0b4454f36",
  type: "page-type/lore",
  slug: "otherwhere-xi-romus",
  title: "Romus",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-romus",
  facts: [
    {
      fact: "Tall Romus is a villager of a frontier village at the northern edge of the Deadshield.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Romus is a light infantry veteran who served five years on the Northern wall.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Romus is married; he met his wife in Glastia.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An exiled princess mage of Vizim on the Northern wall taught Romus foot massage.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Romus fought beside Viv when Octas' Herald besieged his village with spiders.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Romus lives in his village, some fifteen years on.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
