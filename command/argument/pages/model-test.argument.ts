import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const modelTest = {
  id: "01a094f8-d52b-7549-a196-fde55248c83d",
  type: "page-type/argument",
  slug: "model-test",
  said: "--test",
  takes: "the model test whose prompt is put to the model",
  value: "text",
  placeholder: "test",
  createdAt: "2026-09-12T09:35:30.603Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
