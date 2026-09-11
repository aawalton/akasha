import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const fortuneTeller = {
  id: "01a0657e-1366-7bea-bd57-1c7e6d888f02",
  type: "world-class",
  slug: "fortune-teller",
  title: "Fortune Teller",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
