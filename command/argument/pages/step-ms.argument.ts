import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const stepMs = {
  id: "01a094c5-c3ee-7ac3-8f46-5d0784dc6218",
  type: "page-type/argument",
  slug: "step-ms",
  said: "--step-ms",
  takes: "how long each move of the drag takes, 30 where none is said",
  value: "whole-number",
  placeholder: "ms",
  default: "30",
  createdAt: "2026-09-12T08:39:43.854Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
