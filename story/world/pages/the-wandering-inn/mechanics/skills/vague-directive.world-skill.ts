import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const vagueDirective = {
  id: "01a0657d-0320-7725-887b-3f114cd00729",
  type: "page-type/world-skill",
  slug: "vague-directive",
  title: "Vague Directive",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
