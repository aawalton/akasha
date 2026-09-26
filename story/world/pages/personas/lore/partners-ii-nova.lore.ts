import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const partnersIiNova = {
  id: "01a0de51-2d5f-7503-9db1-b7f7a09a3fd6",
  type: "page-type/lore",
  slug: "partners-ii-nova",
  title: "Nova",
  world: "world/personas",
  about: "character-other/partners-ii-nova",
  facts: [{ fact: "Nova is a goblin burglar-scholar.", knowers: ["lore-disclosure/game-master"] }],
} as const satisfies Lore
