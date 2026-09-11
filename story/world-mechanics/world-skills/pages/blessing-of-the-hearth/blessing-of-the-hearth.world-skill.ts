import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const blessingOfTheHearth = {
  id: "01a06575-97f6-777f-ba46-8c705d5ef6ab",
  type: "world-skill",
  slug: "blessing-of-the-hearth",
  title: "Blessing of the Hearth",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
