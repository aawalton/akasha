import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const barber = {
  id: "01a0657e-1339-77e6-80d6-9b14a4a04adc",
  type: "page-type/world-class",
  slug: "barber",
  title: "Barber",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
