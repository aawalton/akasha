import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const seatModel = {
  id: "01a094eb-2760-7a4d-8dc7-8bfd5e6384f1",
  type: "page-type/argument",
  slug: "seat-model",
  said: "--model",
  takes: "the model the seat launched here runs on",
  value: "text",
  placeholder: "id",
  createdAt: "2026-09-12T09:20:34.144Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
