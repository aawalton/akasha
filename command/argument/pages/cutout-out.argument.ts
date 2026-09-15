import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const cutoutOut = {
  id: "01a0950d-0dd6-7376-b203-a05ae692dbfb",
  type: "page-type/argument",
  slug: "cutout-out",
  said: "--cutout-out",
  takes: "where that cutout is written",
  value: "path",
  placeholder: "path",
} as const satisfies Argument
