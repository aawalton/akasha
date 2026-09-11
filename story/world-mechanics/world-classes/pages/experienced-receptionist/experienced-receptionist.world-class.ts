import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const experiencedReceptionist = {
  id: "01a0657e-01d9-7494-94fa-b48aa0a096d9",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "experienced-receptionist",
  title: "Experienced Receptionist",
  world: "the-wandering-inn",
  evolvesToSlugs: ["vice-guildmistress"],
  references: "jsonl",
} as const satisfies WorldClass
