import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const readingsDir = {
  id: "01a0b6ff-eb9e-7f53-9303-94706c8f8f2f",
  type: "page-type/argument",
  slug: "readings-dir",
  said: "--readings-dir",
  takes: "the folder holding one file of gathered readings to a chapter",
  value: "text",
  placeholder: "dir",
  createdAt: "2026-09-19T00:10:20.446Z",
  updatedAt: "2026-09-19T00:16:27.000Z",
} as const satisfies Argument
