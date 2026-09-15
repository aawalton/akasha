import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const section = {
  id: "01a094d3-1a03-7453-8604-f877b283c861",
  type: "argument",
  slug: "section",
  said: "--section",
  takes: "which section is given back: rules, item-rules, consumables, priority, divergence or all",
  value: "text",
  placeholder: "section",
  default: "all",
} as const satisfies Argument
