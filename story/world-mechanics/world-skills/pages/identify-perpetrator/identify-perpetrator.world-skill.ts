import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const identifyPerpetrator = {
  id: "01a06575-981c-7612-bcc9-fa27e0108b8b",
  type: "world-skill",
  slug: "identify-perpetrator",
  title: "Identify Perpetrator",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
