import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const tremorFist = {
  id: "01a0657d-0316-7ecd-84fb-b0bb4a376ffb",
  type: "page-type/world-skill",
  slug: "tremor-fist",
  title: "Tremor Fist",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
