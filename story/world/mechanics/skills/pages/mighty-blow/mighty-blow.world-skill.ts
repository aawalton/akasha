import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const mightyBlow = {
  id: "01a0657d-024d-78fd-bd68-318c7f78c9cb",
  type: "page-type/world-skill",
  slug: "mighty-blow",
  title: "Mighty Blow",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
