import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const superSupportiveInstrumentMeister = {
  id: "01a0e9f5-fdeb-74ca-af9a-72bf112b7aba",
  type: "page-type/world-class",
  slug: "super-supportive-instrument-meister",
  title: "Instrument Meister",
  world: "world/super-supportive",
  aliases: ["instrument Meisters"],
  description: "A Meister subclass whose tool is a musical instrument.",
} as const satisfies WorldClass
