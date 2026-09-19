import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const pavillionOfSecrets = {
  id: "01a0657d-028e-7532-bafd-51e1e6a08667",
  type: "page-type/world-skill",
  slug: "pavillion-of-secrets",
  title: "Pavillion of Secrets",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
