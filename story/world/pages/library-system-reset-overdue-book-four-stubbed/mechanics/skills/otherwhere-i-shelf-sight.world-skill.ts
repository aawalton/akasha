import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const otherwhereIShelfSight = {
  id: "01a0e7da-4cd6-7933-8410-b02405d93c50",
  type: "page-type/world-skill",
  slug: "otherwhere-i-shelf-sight",
  title: "Shelf Sight",
  world: "world/library-system-reset-overdue-book-four-stubbed",
  description: "A glance at a book shows which shelf it belongs on.",
  manaCost: 1,
  durationMinutes: 60,
} as const satisfies WorldSkill
