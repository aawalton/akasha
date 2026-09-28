import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const superSupportiveFanSpell = {
  id: "01a0e9f9-7734-732c-b208-0ecacf575afd",
  type: "page-type/world-spell",
  slug: "super-supportive-fan-spell",
  title: "Fan spell",
  world: "world/super-supportive",
  aliases: ["fan-cast spell"],
  description:
    "A spell cast with a folding fan and a final sweep that intensifies a feeling in the target.",
} as const satisfies WorldSpell
