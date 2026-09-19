import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const knockoutPunch = {
  id: "01a06575-9821-75de-a3ee-7718a92629cb",
  type: "page-type/world-skill",
  slug: "knockout-punch",
  title: "Knockout Punch",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
