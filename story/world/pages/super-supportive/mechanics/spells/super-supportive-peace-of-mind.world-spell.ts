import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const superSupportivePeaceOfMind = {
  id: "01a0e9f2-f148-7834-9f39-9db9cba038ed",
  type: "page-type/world-spell",
  slug: "super-supportive-peace-of-mind",
  title: "Peace of Mind",
  world: "world/super-supportive",
  aliases: ["peace of mind sacrifice"],
  description: "A common minor wordchain that asks another for a portion of their mind's ease.",
  createdAt: "2026-09-28T21:36:47.944Z",
  updatedAt: "2026-09-28T21:36:51.000Z",
} as const satisfies WorldSpell
