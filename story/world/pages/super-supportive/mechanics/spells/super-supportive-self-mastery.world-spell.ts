import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const superSupportiveSelfMastery = {
  id: "01a0e9f2-f149-7bde-9a8e-0ff14b1eefc8",
  type: "page-type/world-spell",
  slug: "super-supportive-self-mastery",
  title: "Self Mastery",
  world: "world/super-supportive",
  aliases: ["My Body Becomes my Assistant", "Gracefulness"],
  description:
    "A difficult wordchain that heightens awareness and control of the body and spatial awareness.",
} as const satisfies WorldSpell
