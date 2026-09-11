import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const antimagicBlade = {
  id: "01a06575-97eb-7c75-adb0-b7ce92bc8de8",
  type: "world-skill",
  slug: "antimagic-blade",
  title: "Antimagic Blade",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
