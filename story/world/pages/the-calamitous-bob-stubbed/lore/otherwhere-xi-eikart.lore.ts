import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiEikart = {
  id: "01a0ea7f-1ca5-7282-ad13-d953d11ba3e5",
  type: "page-type/lore",
  slug: "otherwhere-xi-eikart",
  title: "Duke Eikart",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-eikart",
  facts: [
    {
      fact: "Duke Eikart ruled Baran's semi-arid eastern marches, a poor duchy often at war with Halluria.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Eikart hosted the alliance army at the pass when the Nemeti came through Halluria.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Nemeti assassins killed Eikart on the first night at the pass; Eikart is dead.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Eikart's widow rules his duchy, and Duke Falstag led the Baranese after him.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
