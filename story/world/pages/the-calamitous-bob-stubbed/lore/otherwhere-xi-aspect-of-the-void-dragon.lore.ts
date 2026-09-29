import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiAspectOfTheVoidDragon = {
  id: "01a0ea8c-6dbd-7114-884c-75f1c3464f69",
  type: "page-type/lore",
  slug: "otherwhere-xi-aspect-of-the-void-dragon",
  title: "True Aspect of the Void Dragon",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-aspect/otherwhere-xi-aspect-of-the-void-dragon",
  facts: [
    {
      fact: 'It comes with "You have unlocked your fourth and final aspect."',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: '"[True Aspect of the Void Dragon: You gain access to all three aspects at a lesser power.',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "…You gain proper wings and the instinct to use them.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "…You gain 'scales': your coating becomes extremely resilient in true form.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: '…You gain a breath attack. While transformed, fate mana becomes easier to perceive."',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Void Dragon is a black draconic war-form; in it, a blade grows from each finger.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Void Dragon's heightened repertoire includes [Mantle], a ring of blades.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
