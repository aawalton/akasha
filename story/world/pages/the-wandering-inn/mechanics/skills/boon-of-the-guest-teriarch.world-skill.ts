import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const boonOfTheGuestTeriarch = {
  id: "01a06575-97f7-7a01-a52d-eaf1f39898db",
  type: "page-type/world-skill",
  slug: "boon-of-the-guest-teriarch",
  title: "Boon of the Guest: Teriarch",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
