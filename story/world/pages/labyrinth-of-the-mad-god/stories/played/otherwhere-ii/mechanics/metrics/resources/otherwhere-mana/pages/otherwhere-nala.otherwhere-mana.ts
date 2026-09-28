import type { OtherwhereMana } from "akasha/story/world/pages/labyrinth-of-the-mad-god/stories/played/otherwhere-ii/mechanics/metrics/resources/otherwhere-mana/otherwhere-mana.page-type.types.ts"

export const otherwhereNala = {
  id: "01a0e999-2dff-7a05-a845-ee20ebbfd902",
  type: "page-type/otherwhere-mana",
  slug: "otherwhere-nala",
  character: "character-player/otherwhere-nala",
  value: 6,
  minValue: 0,
  maxValue: 6,
  history: "jsonl",
} as const satisfies OtherwhereMana
