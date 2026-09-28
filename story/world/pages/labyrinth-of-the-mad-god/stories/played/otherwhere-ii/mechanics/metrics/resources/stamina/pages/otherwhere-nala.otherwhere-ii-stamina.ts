import type { OtherwhereIiStamina } from "akasha/story/world/pages/labyrinth-of-the-mad-god/stories/played/otherwhere-ii/mechanics/metrics/resources/stamina/otherwhere-ii-stamina.page-type.types.ts"

export const otherwhereNala = {
  id: "01a0e999-2dff-78d8-a604-4bd6d2d01b7f",
  type: "page-type/otherwhere-ii-stamina",
  slug: "otherwhere-nala",
  character: "character-player/otherwhere-ii-nala",
  value: 11,
  minValue: 0,
  maxValue: 20,
  history: "jsonl",
} as const satisfies OtherwhereIiStamina
