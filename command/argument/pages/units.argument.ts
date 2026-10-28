import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const units = {
  id: "01a183ee-da96-7601-8952-a1a5a0940ab5",
  type: "page-type/argument",
  slug: "units",
  said: "--units",
  takes: "how many of an activity's units to price, as a number above zero",
  value: "text",
  placeholder: "n",
  createdAt: "2026-10-28T19:13:51.253Z",
  updatedAt: "2026-10-28T19:13:51.253Z",
} as const satisfies Argument
