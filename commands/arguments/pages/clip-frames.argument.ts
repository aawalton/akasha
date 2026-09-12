import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const clipFrames = {
  id: "01a094d4-5f2f-7fad-99d0-94bea6131eab",
  type: "argument",
  slug: "clip-frames",
  said: "--frames",
  takes: "the clip's length in frames",
  value: "whole-number",
  placeholder: "n",
} as const satisfies Argument
