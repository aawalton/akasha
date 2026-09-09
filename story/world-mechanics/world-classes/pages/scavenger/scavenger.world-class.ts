import type { WorldClass } from "../../world-class.page-type.ts"

export const scavenger = {
  id: "01a0657e-024a-7f7c-ae64-6f1f731f7991",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "scavenger",
  title: "Scavenger",
  world: "the-wandering-inn",
  aliases: ["scavengers"],
  references: "jsonl",
} as const satisfies WorldClass
