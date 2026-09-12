import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const steps = {
  id: "01a094b7-e3cc-7a5b-bbd8-09fa79b6cbc6",
  type: "argument",
  slug: "steps",
  said: "--steps",
  takes: "how many denoise steps the sampler runs",
  value: "whole-number",
  placeholder: "n",
} as const satisfies Argument
