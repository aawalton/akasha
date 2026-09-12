import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const baseModel = {
  id: "01a094d8-ac3c-7f10-bb7a-d9864db32fe1",
  type: "argument",
  slug: "base-model",
  said: "--base-model",
  takes: "the selector mflux takes here, which is passed over",
  value: "text",
  placeholder: "name",
} as const satisfies Argument
