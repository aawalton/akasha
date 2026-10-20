import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const compare = {
  id: "01a159b3-59f5-76af-95ae-dacbdac757e7",
  type: "page-type/argument",
  slug: "compare",
  said: "--compare",
  takes:
    "a second build, named the way the first is, whose differences from the first alone are shown",
  value: "text",
  placeholder: "build",
  createdAt: "2026-10-20T14:24:48.628Z",
  updatedAt: "2026-10-20T14:24:48.628Z",
} as const satisfies Argument
