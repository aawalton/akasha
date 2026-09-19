import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const innPavilionOfSecrets = {
  id: "01a06575-981f-790a-8b6f-7066448df7a7",
  type: "page-type/world-skill",
  slug: "inn-pavilion-of-secrets",
  title: "Inn: Pavilion of Secrets",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
