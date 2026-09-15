import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const huntMasters = {
  id: "01a0657e-1375-73cd-99f2-97ff6db491a8",
  type: "world-class",
  slug: "hunt-masters",
  title: "Hunt Masters",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
