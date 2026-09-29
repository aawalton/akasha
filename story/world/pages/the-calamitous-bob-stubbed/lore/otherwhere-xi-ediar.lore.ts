import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiEdiar = {
  id: "01a0ea7f-d847-73bd-9b7f-adc52c380701",
  type: "page-type/lore",
  slug: "otherwhere-xi-ediar",
  title: "Ediar of Reixa",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-ediar",
  facts: [
    {
      fact: "Ediar of Reixa is an old, one-armed Enorian lord, Duke of the market city of Reixa.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ediar's grandson and heir is Gedis.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Reixa was seized by the outlaw Elix in the civil war before Ediar held it again.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ediar dealt with Viv in the final war; this season he is thought to be at Reixa.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
