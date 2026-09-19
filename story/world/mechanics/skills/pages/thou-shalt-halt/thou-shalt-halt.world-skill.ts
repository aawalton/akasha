import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const thouShaltHalt = {
  id: "01a0657d-0314-7e24-87b7-4aea9429a6c0",
  type: "page-type/world-skill",
  slug: "thou-shalt-halt",
  title: "Thou Shalt Halt",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
