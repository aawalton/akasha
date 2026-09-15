import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const templar = {
  id: "01a06586-0a64-7f54-b781-73dce622c614",
  type: "world-class",
  slug: "templar",
  title: "Templar",
  world: "world/the-wandering-inn",
  aliases: ["templars"],
  evolvesFromSlugs: ["crusader"],
  references: "jsonl",
} as const satisfies WorldClass
