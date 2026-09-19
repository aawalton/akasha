import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const clerk = {
  id: "01a0657e-134a-760c-8576-c0fe5e7fe4ed",
  type: "page-type/world-class",
  slug: "clerk",
  title: "Clerk",
  world: "world/the-wandering-inn",
  aliases: ["Clerk."],
  references: "jsonl",
} as const satisfies WorldClass
