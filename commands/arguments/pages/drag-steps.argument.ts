import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const dragSteps = {
  id: "01a094c5-af47-7e5f-88a6-9a7255eb793c",
  type: "argument",
  slug: "drag-steps",
  said: "--steps",
  takes: "how many moves the drag is made of, 12 where none is said",
  value: "whole-number",
  placeholder: "n",
} as const satisfies Argument
