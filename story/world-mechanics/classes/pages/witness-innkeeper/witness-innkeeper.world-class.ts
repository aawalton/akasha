import type { WorldClass } from "../../world-class.page-type.ts"

export const witnessInnkeeper = {
  id: "01a0657e-0272-7e81-8728-787cce66ec3e",
  pageTypeSlug: "world-class",
  slug: "witness-innkeeper",
  title: "Witness Innkeeper",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["portside-innkeeper"],
  references: "jsonl",
} as const satisfies WorldClass
