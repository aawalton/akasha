import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const turn = {
  id: "01a0c5ff-2c1e-75e2-8c35-5c22070f0ae8",
  type: "page-type/argument",
  slug: "turn",
  said: "--turn",
  takes: "which turn of the game this is",
  value: "whole-number",
  placeholder: "n",
  createdAt: "2026-09-21T22:03:49.662Z",
  updatedAt: "2026-09-21T22:04:07.000Z",
} as const satisfies Argument
