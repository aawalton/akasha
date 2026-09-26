import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const partnersAlanTheLink = {
  id: "01a0de54-1c10-7950-8949-7822e94335f6",
  type: "page-type/lore",
  slug: "partners-alan-the-link",
  title: "The Link",
  world: "world/personas",
  about: "partners-talent/partners-alan-the-link",
  loreDisclosure: "lore-disclosure/game-master",
  facts: [
    "The Link forms with a companion whose bond reaches Linked, at 300 bond points and a mutual yes.",
    "Crane is watching Alan.",
  ],
} as const satisfies Lore
