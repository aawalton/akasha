import type { WorldCurse } from "akasha/story/world/mechanics/curses/world-curse.page-type.types.ts"

export const stingingWarts = {
  id: "01a0655a-0687-7244-b030-6683332b13df",
  type: "page-type/world-curse",
  slug: "stinging-warts",
  title: "Stinging Warts",
  world: "world/the-wandering-inn",
} as const satisfies WorldCurse
