import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const safety = {
  id: "01a094af-8c1d-74a1-98aa-4e845dc40cae",
  type: "page-type/argument",
  slug: "safety",
  said: "--safety",
  takes: "how safe Alan was over the stretch, from -2 to 5 in half steps",
  value: "text",
  placeholder: "level",
  createdAt: "2026-09-12T08:15:27.773Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
