import type { WorldClass } from "../../world-class.page-type.ts"

export const barmaid = {
  id: "01a0657e-01b2-7c35-a112-50468414b47e",
  pageTypeSlug: "world-class",
  slug: "barmaid",
  title: "Barmaid",
  worldSlug: "the-wandering-inn",
  aliases: ["barmaids"],
  evolvesToSlugs: ["boxhead-barmaid"],
  references: "jsonl",
} as const satisfies WorldClass
