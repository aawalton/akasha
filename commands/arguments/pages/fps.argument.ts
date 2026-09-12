import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const fps = {
  id: "01a09484-45c7-7bda-8655-eeb02951efec",
  type: "argument",
  slug: "fps",
  said: "--fps",
  takes: "the rate a clip is resampled to, every frame kept where none is said",
  value: "whole-number",
  placeholder: "n",
} as const satisfies Argument
