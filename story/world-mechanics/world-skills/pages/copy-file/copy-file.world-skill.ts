import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const copyFile = {
  id: "01a06575-97fd-7bc3-b2e9-19b0b9382222",
  type: "world-skill",
  slug: "copy-file",
  title: "Copy File",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
