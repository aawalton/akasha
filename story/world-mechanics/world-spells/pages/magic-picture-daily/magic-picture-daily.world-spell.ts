import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const magicPictureDaily = {
  id: "01a06572-95d1-78af-9d05-7323104233f0",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "magic-picture-daily",
  title: "– Magic Picture (Daily)",
  world: "the-wandering-inn",
} as const satisfies WorldSpell
