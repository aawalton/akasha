import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const receptionist = {
  id: "01a0657e-0245-7fa6-a8e6-1c1db05321fa",
  type: "world-class",
  slug: "receptionist",
  title: "Receptionist",
  world: "the-wandering-inn",
  aliases: ["receptionists"],
  references: "jsonl",
} as const satisfies WorldClass
