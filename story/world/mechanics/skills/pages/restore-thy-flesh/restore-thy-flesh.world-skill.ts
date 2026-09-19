import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const restoreThyFlesh = {
  id: "01a0657d-02b1-7354-a756-8c954031700d",
  type: "page-type/world-skill",
  slug: "restore-thy-flesh",
  title: "Restore…Thy…Flesh…",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
