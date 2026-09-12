import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const frames = {
  id: "01a09484-3090-7ef6-a37d-c62677bf87df",
  type: "argument",
  slug: "frames",
  said: "--frames",
  takes: "how many frames are sampled out of the ones there are",
  value: "whole-number",
  placeholder: "n",
} as const satisfies Argument
