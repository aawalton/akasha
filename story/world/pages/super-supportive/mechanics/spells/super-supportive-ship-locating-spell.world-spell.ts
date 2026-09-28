import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const superSupportiveShipLocatingSpell = {
  id: "01a0e9f7-9e6e-752b-8261-bb486302af09",
  type: "page-type/world-spell",
  slug: "super-supportive-ship-locating-spell",
  title: "ship-locating spell impression",
  world: "world/super-supportive",
  aliases: ["named-object locator", "spell impression for finding oft-named objects"],
  description:
    "A spell impression that finds an object with a unique enough name in the caster's body of water.",
} as const satisfies WorldSpell
