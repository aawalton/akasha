import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIvCedricTarrow = {
  id: "01a0ed2e-5593-7a66-97e2-070ce9555af5",
  type: "page-type/lore",
  slug: "overwhere-iv-cedric-tarrow",
  title: "Cedric Tarrow",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  facts: [
    { fact: "Cedric Tarrow is charming and ruthless.", knowers: ["lore-disclosure/game-master"] },
    {
      fact: "Cedric would use any rare talent he found as a weapon.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He runs the barony's business while his aunt lies ill.",
      knowers: ["lore-disclosure/game-master", "lore/overwhere-iv-garrett-pell"],
    },
  ],
  createdAt: "2026-09-29T12:40:31.891Z",
  updatedAt: "2026-10-27T19:42:51.926Z",
} as const satisfies Lore
