import type { WorldCurse } from "akasha/story/world-mechanics/world-curses/world-curse.page-type.types.ts"

export const stingingWarts = {
  id: "01a0655a-0687-7244-b030-6683332b13df",
  pageTypeSlug: "world-curse",
  type: "world-curse",
  slug: "stinging-warts",
  title: "Stinging Warts",
  world: "the-wandering-inn",
} as const satisfies WorldCurse
