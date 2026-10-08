import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const bodyweight = {
  id: "01a094e5-8f0c-7209-a286-e38af1d0e4e9",
  type: "page-type/argument",
  slug: "bodyweight",
  said: "--bodyweight",
  takes: "what Alan's body weighed, in pounds",
  value: "text",
  placeholder: "lb",
  createdAt: "2026-09-12T09:14:27.468Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
