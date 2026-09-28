import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVShieldOfSolemnance = {
  id: "01a0ea03-8130-719b-beab-6c9035756590",
  type: "page-type/lore",
  slug: "otherwhere-v-shield-of-solemnance",
  title: "Shield of Solemnance",
  world: "world/ends-of-magic",
  about: "world-item/otherwhere-v-shield-of-solemnance",
  facts: [
    {
      fact: "A Shield of Solemnance suppresses destructive magic over an area, above all wizardry.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A Shield of Solemnance dampens extreme spells to prevent devastation.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Shields are masterpieces of wizardry, prove-works of the mage-lords of Kalis.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A Shield should be undetectable to all but skilled wizards, yet its aura is huge.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Shield of Esebus is kept in the Esebus vault and guards the city.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A similar Shield reaches a dozen miles around Keihona and changes reality inside it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Questors hoard the Shields of Solemnance to limit the most horrible magics.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
