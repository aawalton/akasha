import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const expandPanels = {
  id: "01a0c4e0-2320-70fa-b625-c8b58dc80bea",
  type: "page-type/argument",
  slug: "expand-panels",
  said: "--expand-panels",
  takes: "open every panel the page holds closed rather than shoot them closed",
  value: "none",
} as const satisfies Argument
