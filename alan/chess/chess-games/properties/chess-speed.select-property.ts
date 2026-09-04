import type { SelectProperty } from "@akasha/pages-system/select-property"

export const chessSpeed = {
  id: "01a06582-bd62-7f9c-b58c-4fd4df3f7b4f",
  pageTypeSlug: "select-property",
  slug: "chess-speed",
  propertySlug: "speed",
  definition: "how fast a game was played",
  values: ["ultra-bullet", "bullet", "blitz", "rapid", "classical", "correspondence", "unlimited"],
} as const satisfies SelectProperty

export type ChessSpeed = (typeof chessSpeed.values)[number]
