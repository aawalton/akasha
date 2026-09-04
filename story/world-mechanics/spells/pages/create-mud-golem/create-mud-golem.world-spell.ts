import type { WorldSpell } from "../../world-spell.page-type.ts"

export const createMudGolem = {
  id: "01a06572-95bb-705d-b4cd-cc819bd5197e",
  pageTypeSlug: "world-spell",
  slug: "create-mud-golem",
  title: "Create Mud Golem",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
