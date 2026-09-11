import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const commander = {
  id: "01a0657e-01c9-7984-9da3-dcae9efbce36",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "commander",
  title: "Commander",
  world: "the-wandering-inn",
  aliases: ["Commander.", "commanders"],
  references: "jsonl",
} as const satisfies WorldClass
