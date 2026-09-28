import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const superSupportiveForceOfTheBody = {
  id: "01a0e9f7-9e6d-716b-807d-6a08760bbf92",
  type: "page-type/world-spell",
  slug: "super-supportive-force-of-the-body",
  title: "Force of the Body",
  world: "world/super-supportive",
  aliases: ["Force of the Body family"],
  description: "A family of wordchains that turn a sweep of the hand into something explosive.",
} as const satisfies WorldSpell
