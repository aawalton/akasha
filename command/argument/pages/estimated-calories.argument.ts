import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const estimatedCalories = {
  id: "01a094e1-90f9-7ef6-8902-70ffe25d6a1c",
  type: "page-type/argument",
  slug: "estimated-calories",
  said: "--estimated-calories",
  takes: "the food's estimated total calories",
  value: "whole-number",
  placeholder: "n",
  createdAt: "2026-09-12T09:10:05.817Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
