import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const windcutterStrikes = {
  id: "01a0657d-0336-7ff8-ac58-2bb23667c30a",
  type: "page-type/world-skill",
  slug: "windcutter-strikes",
  title: "Windcutter Strikes",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
