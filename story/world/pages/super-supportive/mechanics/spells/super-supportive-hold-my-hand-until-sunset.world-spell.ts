import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const superSupportiveHoldMyHandUntilSunset = {
  id: "01a0e9f2-f147-77d7-b60e-255fca50cfe9",
  type: "page-type/world-spell",
  slug: "super-supportive-hold-my-hand-until-sunset",
  title: "Hold my hand until sunset",
  world: "world/super-supportive",
  description: "An Adjuster capture spell that glues the caster's hand to the target's.",
} as const satisfies WorldSpell
