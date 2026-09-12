import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const bodyweight = {
  id: "01a094e5-8f0c-7209-a286-e38af1d0e4e9",
  type: "argument",
  slug: "bodyweight",
  said: "--bodyweight",
  takes: "what Alan's body weighed, in pounds",
  value: "text",
  placeholder: "lb",
} as const satisfies Argument
