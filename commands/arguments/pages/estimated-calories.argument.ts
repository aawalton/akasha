import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const estimatedCalories = {
  id: "01a094e1-90f9-7ef6-8902-70ffe25d6a1c",
  type: "argument",
  slug: "estimated-calories",
  said: "--estimated-calories",
  takes: "the food's estimated total calories",
  value: "whole-number",
  placeholder: "n",
} as const satisfies Argument
