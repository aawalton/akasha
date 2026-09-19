import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const rapidDisassembly = {
  id: "01a0657d-02a4-7f47-b31b-067c778f3ae0",
  type: "page-type/world-skill",
  slug: "rapid-disassembly",
  title: "Rapid Disassembly",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
