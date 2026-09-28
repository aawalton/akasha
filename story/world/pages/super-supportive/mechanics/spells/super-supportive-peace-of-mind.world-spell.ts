import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const superSupportivePeaceOfMind = {
  id: "01a0e9f2-f148-7834-9f39-9db9cba038ed",
  type: "page-type/world-spell",
  slug: "super-supportive-peace-of-mind",
  title: "Peace of Mind",
  world: "world/super-supportive",
  aliases: ["peace of mind sacrifice"],
  description: "A common minor wordchain that asks another for a portion of their mind's ease.",
} as const satisfies WorldSpell
