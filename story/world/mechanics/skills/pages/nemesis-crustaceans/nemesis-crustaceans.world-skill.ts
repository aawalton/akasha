import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const nemesisCrustaceans = {
  id: "01a0657d-027a-7a1c-aa07-1ecfab7fb27e",
  type: "page-type/world-skill",
  slug: "nemesis-crustaceans",
  title: "Nemesis: Crustaceans",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
