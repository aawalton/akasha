import type { WorldClass } from "../../world-class.page-type.ts"

export const potterOfSecrets = {
  id: "01a06586-0a0b-7429-b684-45d6578a8613",
  pageTypeSlug: "world-class",
  slug: "potter-of-secrets",
  title: "Potter of Secrets",
  worldSlug: "the-wandering-inn",
  evolvesToSlugs: ["potmaker-of-buried-truths"],
  references: "jsonl",
} as const satisfies WorldClass
