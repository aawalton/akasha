import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const newspaperEditor = {
  id: "01a0657e-13b1-744e-b69b-7b3b96aa83f5",
  type: "world-class",
  slug: "newspaper-editor",
  title: "Newspaper Editor",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
