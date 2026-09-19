import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const ignoreAuthority = {
  id: "01a06575-981c-7ade-878b-ae4b3ae11bd8",
  type: "page-type/world-skill",
  slug: "ignore-authority",
  title: "Ignore Authority",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
