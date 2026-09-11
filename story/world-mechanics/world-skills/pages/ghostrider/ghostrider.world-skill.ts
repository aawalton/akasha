import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const ghostrider = {
  id: "01a06575-9814-7238-8b75-629f6b809adb",
  type: "world-skill",
  slug: "ghostrider",
  title: "Ghostrider",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
