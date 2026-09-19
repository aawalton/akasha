import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const apprenticeCooks = {
  id: "01a0657e-132d-7aca-97d6-b71764b5247d",
  type: "page-type/world-class",
  slug: "apprentice-cooks",
  title: "Apprentice Cooks",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
