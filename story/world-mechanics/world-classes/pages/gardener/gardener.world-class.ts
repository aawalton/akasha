import type { WorldClass } from "../../world-class.page-type.ts"

export const gardener = {
  id: "01a0657e-01df-7db3-8231-41e2363a05eb",
  pageTypeSlug: "world-class",
  slug: "gardener",
  title: "Gardener",
  worldSlug: "the-wandering-inn",
  aliases: ["gardeners"],
  references: "jsonl",
} as const satisfies WorldClass
