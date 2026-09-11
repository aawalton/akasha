import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const blueprintGearSystem = {
  id: "01a06575-97f6-7c93-a99a-a57adff039ce",
  type: "world-skill",
  slug: "blueprint-gear-system",
  title: "Blueprint: Gear System",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
