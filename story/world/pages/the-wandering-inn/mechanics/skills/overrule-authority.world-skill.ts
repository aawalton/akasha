import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const overruleAuthority = {
  id: "01a0657d-027f-7edb-856e-bc2059752c73",
  type: "page-type/world-skill",
  slug: "overrule-authority",
  title: "Overrule Authority",
  world: "world/the-wandering-inn",
} as const satisfies WorldSkill
