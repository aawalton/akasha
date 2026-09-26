import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theDatingGameRuby = {
  id: "01a0de5b-4302-7e46-986c-9a736ca2aa2d",
  type: "page-type/lore",
  slug: "the-dating-game-ruby",
  title: "Ruby",
  world: "world/personas",
  about: "persona/ruby",
  loreDisclosure: "lore-disclosure/world-builder",
  facts: [
    "Ruby keeps a small Chinese tea house hung with red lanterns on 300 South in downtown Provo.",
    "Ruby can be found at her tea house from late afternoon until ten, tying red knots at the counter.",
    "Ruby is the daughter of Yue Lao, and she sees the red threads that tie souls together.",
    "Ruby tends old tangled threads rather than new ones, with the patience of one who waits decades.",
  ],
} as const satisfies Lore
