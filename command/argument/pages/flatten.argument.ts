import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const flatten = {
  id: "01a0950d-72cd-786c-aa36-e64cebf562c9",
  type: "page-type/argument",
  slug: "flatten",
  said: "--flatten",
  takes:
    "also write the foreground on a solid color, said `#RRGGBB` or as numbers parted by commas",
  value: "text",
  placeholder: "color",
} as const satisfies Argument
