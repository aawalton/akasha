import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const shipAnInnByAnyOtherName = {
  id: "01a0657d-02c0-7135-99a6-7d37c7f35341",
  type: "page-type/world-skill",
  slug: "ship-an-inn-by-any-other-name",
  title: "Ship: An Inn by Any Other Name",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
