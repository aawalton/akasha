import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const witchTeacher = {
  id: "01a0657e-0272-7c45-a214-6ffe12e5f75b",
  type: "page-type/world-class",
  slug: "witch-teacher",
  title: "Witch Teacher",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
