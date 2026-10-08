import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const frames = {
  id: "01a09484-3090-7ef6-a37d-c62677bf87df",
  type: "page-type/argument",
  slug: "frames",
  said: "--frames",
  takes: "how many frames are sampled out of the ones there are",
  value: "whole-number",
  placeholder: "n",
  default: "16",
  createdAt: "2026-09-12T07:28:06.288Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
