import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const chessSpeed = {
  id: "01a06582-bd62-7f9c-b58c-4fd4df3f7b4f",
  type: "page-type/select-property",
  slug: "chess-speed",
  propertySlug: "speed",
  definition: "how fast the players of a game must move",
  values: ["ultra-bullet", "bullet", "blitz", "rapid", "classical", "correspondence", "unlimited"],
  types: "ts",
  createdAt: "2026-09-03T04:24:22.114Z",
  updatedAt: "2026-10-30T15:06:16.771Z",
} as const satisfies SelectProperty
