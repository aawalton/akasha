import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const steps = {
  id: "01a094b7-e3cc-7a5b-bbd8-09fa79b6cbc6",
  type: "page-type/argument",
  slug: "steps",
  said: "--steps",
  takes: "how many denoise steps the sampler runs",
  value: "whole-number",
  placeholder: "n",
  createdAt: "2026-09-12T08:24:34.508Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
