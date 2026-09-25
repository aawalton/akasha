import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const ignoreCase = {
  id: "01a0d95d-0562-7ac8-833a-526804113b0f",
  type: "page-type/argument",
  slug: "ignore-case",
  said: "--ignore-case",
  takes: "a match whatever the case of its letters",
  value: "none",
} as const satisfies Argument
