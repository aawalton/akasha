import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const potterOfSecrets = {
  id: "01a06586-0a0b-7429-b684-45d6578a8613",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "potter-of-secrets",
  title: "Potter of Secrets",
  world: "the-wandering-inn",
  evolvesToSlugs: ["potmaker-of-buried-truths"],
  references: "jsonl",
} as const satisfies WorldClass
