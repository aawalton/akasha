import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const fairweatherEnthraller = {
  id: "01a10218-24b0-7c66-b4ba-54a68574e6cf",
  type: "page-type/world-class",
  slug: "fairweather-enthraller",
  title: "Enthraller",
  world: "world/fairweather",
  description:
    "A class drawing power from bonds, from what people feel toward the caster. It is feared and restricted: every Enthraller is registered with the Adventurers' Guild and monitored under the Strings Accord.",
} as const satisfies WorldClass
