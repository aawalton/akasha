import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const streetRunner = {
  id: "01a0657e-0260-703e-9830-e25550438e17",
  type: "world-class",
  slug: "street-runner",
  title: "Street Runner",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
