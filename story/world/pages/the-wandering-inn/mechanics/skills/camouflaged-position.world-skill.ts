import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const camouflagedPosition = {
  id: "01a06575-97fa-7dee-a24c-b85d02f44a19",
  type: "page-type/world-skill",
  slug: "camouflaged-position",
  title: "Camouflaged Position",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
