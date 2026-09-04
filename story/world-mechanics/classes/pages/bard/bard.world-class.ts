import type { WorldClass } from "../../world-class.page-type.ts"

export const bard = {
  id: "01a0657e-133b-7076-91bc-f65cd506e129",
  pageTypeSlug: "world-class",
  slug: "bard",
  title: "Bard",
  worldSlug: "the-wandering-inn",
  aliases: ["bards"],
  evolvesToSlugs: ["goblin-soulbard"],
  references: "jsonl",
} as const satisfies WorldClass
