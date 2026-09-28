import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const superSupportiveHomeFillingMist = {
  id: "01a0e9f8-aa22-7b44-96f8-31bc274eeff3",
  type: "page-type/world-spell",
  slug: "super-supportive-home-filling-mist",
  title: "Home-filling mist",
  world: "world/super-supportive",
  aliases: ["liquid blessing", "misting"],
  description: "A traditional spell that turns blessing liquid into a mist filling a new house.",
} as const satisfies WorldSpell
