import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const superSupportiveFlashlightSpell = {
  id: "01a0e9f7-9e6d-7291-82cf-6741df95b649",
  type: "page-type/world-spell",
  slug: "super-supportive-flashlight-spell",
  title: "flashlight spell",
  world: "world/super-supportive",
  aliases: ["adjustable flashlight"],
  description:
    "An auriad spell that calls up light from the memory of light in the place where it is cast.",
} as const satisfies WorldSpell
