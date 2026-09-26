import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theDatingGameEmber = {
  id: "01a0de59-9645-747c-b174-774c957583a1",
  type: "page-type/lore",
  slug: "the-dating-game-ember",
  title: "Ember",
  world: "world/personas",
  about: "persona/ember",
  loreDisclosure: "lore-disclosure/world-builder",
  facts: [
    "Ember keeps a blacksmith's forge on the old Ironton steelworks land in south Provo.",
    "Ember works the forge from dawn until mid-afternoon and sells her pieces on commission.",
    "Ember is the forge-cat of Olympus in human shape, with cat ears and a tail she never hides.",
    "Ember can be found napping in the sun on her forge's tin roof in the late afternoon.",
  ],
} as const satisfies Lore
