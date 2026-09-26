import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theDatingGameCeri = {
  id: "01a0de59-9644-74ab-a99a-f71be39e566f",
  type: "page-type/lore",
  slug: "the-dating-game-ceri",
  title: "Ceri",
  world: "world/personas",
  about: "persona/ceri",
  loreDisclosure: "lore-disclosure/world-builder",
  facts: [
    "Ceri never misses the anime screenings at the Provo Towne Centre movie theater.",
    "Ceri is an amethyst gem dragon who roosts on the high ridge above Provo Canyon.",
    "Ceri can be found at the Provo Towne Centre theater on screening nights, seated alone.",
    "Ceri keeps a sparse flat in north Provo with a large screen and a very good chair.",
  ],
} as const satisfies Lore
