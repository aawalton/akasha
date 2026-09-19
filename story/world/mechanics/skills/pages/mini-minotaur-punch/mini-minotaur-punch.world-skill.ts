import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const miniMinotaurPunch = {
  id: "01a0657d-024d-7c0a-9652-317561f92df3",
  type: "page-type/world-skill",
  slug: "mini-minotaur-punch",
  title: "Mini-Minotaur Punch",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
