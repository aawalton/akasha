import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const ignoreAuthority = {
  id: "01a06575-981c-7ade-878b-ae4b3ae11bd8",
  type: "world-skill",
  slug: "ignore-authority",
  title: "Ignore Authority",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
