import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const cyclist = {
  id: "01a0657e-01ce-7e0c-9ff3-e1b2a202413b",
  type: "world-class",
  slug: "cyclist",
  title: "Cyclist",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
