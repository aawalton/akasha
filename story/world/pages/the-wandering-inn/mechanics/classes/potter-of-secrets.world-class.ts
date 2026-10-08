import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const potterOfSecrets = {
  id: "01a06586-0a0b-7429-b684-45d6578a8613",
  type: "page-type/world-class",
  slug: "potter-of-secrets",
  title: "Potter of Secrets",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  evolvesToSlugs: ["world-class/potmaker-of-buried-truths"],
  references: "jsonl",
  createdAt: "2026-09-03T04:27:58.347Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
