import type { WorldClass } from "../../world-class.page-type.ts"

export const experiencedReceptionist = {
  id: "01a0657e-01d9-7494-94fa-b48aa0a096d9",
  pageTypeSlug: "world-class",
  slug: "experienced-receptionist",
  title: "Experienced Receptionist",
  worldSlug: "the-wandering-inn",
  evolvesToSlugs: ["vice-guildmistress"],
  references: "jsonl",
} as const satisfies WorldClass
