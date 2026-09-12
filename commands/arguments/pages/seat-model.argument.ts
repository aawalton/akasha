import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const seatModel = {
  id: "01a094eb-2760-7a4d-8dc7-8bfd5e6384f1",
  type: "argument",
  slug: "seat-model",
  said: "--model",
  takes: "the model the seat launched here runs on",
  value: "text",
  placeholder: "id",
} as const satisfies Argument
