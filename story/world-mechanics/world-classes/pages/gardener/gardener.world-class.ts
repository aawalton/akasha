import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const gardener = {
  id: "01a0657e-01df-7db3-8231-41e2363a05eb",
  type: "world-class",
  slug: "gardener",
  title: "Gardener",
  world: "the-wandering-inn",
  aliases: ["gardeners"],
  references: "jsonl",
} as const satisfies WorldClass
