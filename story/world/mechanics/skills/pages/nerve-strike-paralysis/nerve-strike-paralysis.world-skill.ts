import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const nerveStrikeParalysis = {
  id: "01a0657d-027b-7cf2-948c-de830767581c",
  type: "page-type/world-skill",
  slug: "nerve-strike-paralysis",
  title: "Nerve Strike: Paralysis",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
