import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const doctors = {
  id: "01a0657e-01d0-7f1f-bf6a-acbe49b0445c",
  type: "world-class",
  slug: "doctors",
  title: "Doctors",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
