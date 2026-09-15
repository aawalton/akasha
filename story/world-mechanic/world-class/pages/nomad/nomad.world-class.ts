import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const nomad = {
  id: "01a0657e-0234-77e6-95be-b07449044d21",
  type: "world-class",
  slug: "nomad",
  title: "Nomad",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
