import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const model = {
  id: "01a094d8-9719-7122-b2ac-75ba01434278",
  type: "page-type/argument",
  slug: "model",
  said: "--model",
  takes: "the registered checkpoint the render goes through",
  value: "text",
  placeholder: "id",
  default: "beyond-reality-3",
  createdAt: "2026-09-12T09:00:17.561Z",
  updatedAt: "2026-09-19T15:59:42.000Z",
} as const satisfies Argument
