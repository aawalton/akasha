import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const corporateSecrets = {
  id: "01a06575-97fe-71cd-996c-d78cb8a5ad40",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "corporate-secrets",
  title: "Corporate Secrets",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
