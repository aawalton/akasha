import type { OtherwhereStamina } from "akasha/story/world/pages/labyrinth-of-the-mad-god/stories/played/otherwhere/mechanics/metrics/resources/stamina/otherwhere-stamina.page-type.types.ts"

export const otherwhereNala = {
  id: "01a0e999-2dff-78d8-a604-4bd6d2d01b7f",
  type: "page-type/otherwhere-stamina",
  slug: "otherwhere-nala",
  character: "character-player/otherwhere-nala",
  value: 17,
  minValue: 0,
  maxValue: 20,
  history: "jsonl",
} as const satisfies OtherwhereStamina
