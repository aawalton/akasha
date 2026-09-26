import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theDatingGameSelah = {
  id: "01a0de59-9645-76de-9b08-182208f34b33",
  type: "page-type/lore",
  slug: "the-dating-game-selah",
  title: "Selah",
  world: "world/personas",
  about: "persona/selah",
  loreDisclosure: "lore-disclosure/world-builder",
  facts: [
    "Selah kneels in the gardens of the Provo City Center Temple each evening at dusk.",
    "Selah is an angel of prayer who came down to walk Provo at human height.",
    "Selah volunteers at a downtown Provo shelter, sitting quietly with anyone who wants company.",
    "Selah wears no wings and no halo, and most people take her for a quiet young woman.",
  ],
} as const satisfies Lore
