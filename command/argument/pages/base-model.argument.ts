import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const baseModel = {
  id: "01a094d8-ac3c-7f10-bb7a-d9864db32fe1",
  type: "page-type/argument",
  slug: "base-model",
  said: "--base-model",
  takes: "the selector mflux takes here, which is passed over",
  value: "text",
  placeholder: "name",
  createdAt: "2026-09-12T09:00:22.972Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
