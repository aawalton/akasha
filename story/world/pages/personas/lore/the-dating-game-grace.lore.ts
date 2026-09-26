import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theDatingGameGrace = {
  id: "01a0de59-9645-7aea-990a-495537012364",
  type: "page-type/lore",
  slug: "the-dating-game-grace",
  title: "Grace",
  world: "world/personas",
  about: "persona/grace",
  loreDisclosure: "lore-disclosure/world-builder",
  facts: [
    "Grace lives in a quiet rented house on Apple Avenue in Provo.",
    "Grace works night shifts as a hospice companion, sitting vigil with the dying.",
    "Grace walks the Provo City Cemetery at dusk carrying a lit storm lantern.",
    "Grace is the deathless daughter of Death and Life, and has looked twenty-two for ages.",
  ],
} as const satisfies Lore
