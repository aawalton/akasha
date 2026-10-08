import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const clipFrames = {
  id: "01a094d4-5f2f-7fad-99d0-94bea6131eab",
  type: "page-type/argument",
  slug: "clip-frames",
  said: "--frames",
  takes: "the clip's length in frames",
  value: "whole-number",
  placeholder: "n",
  default: "81",
  createdAt: "2026-09-12T08:55:41.103Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
