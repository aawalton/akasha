import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theDatingGameAwen = {
  id: "01a0de59-9644-7a70-804f-feb14801561b",
  type: "page-type/lore",
  slug: "the-dating-game-awen",
  title: "Awen",
  world: "world/personas",
  about: "persona/awen",
  loreDisclosure: "lore-disclosure/world-builder",
  facts: [
    "Awen restores vintage aircraft in a hangar at the Provo Municipal Airport.",
    "Awen can be found in her hangar on weekdays, working until the light goes.",
    "Awen is a princess with an engineer's hands and wears a corset and a tool belt to work.",
    "Awen carries a brass lamp with an amber crystal that genuinely lights.",
  ],
} as const satisfies Lore
