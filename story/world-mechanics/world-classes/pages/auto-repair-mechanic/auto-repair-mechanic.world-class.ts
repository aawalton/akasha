import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const autoRepairMechanic = {
  id: "01a0657e-1336-7b83-957d-c0b632b18f30",
  type: "world-class",
  slug: "auto-repair-mechanic",
  title: "Auto Repair Mechanic",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
