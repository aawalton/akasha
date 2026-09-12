import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const route = {
  id: "01a094bc-bb9c-7f6e-b0a1-d3f7f1111f93",
  type: "argument",
  slug: "route",
  said: "--route",
  takes: "the route named, such as `/home` or a page's own path",
  value: "text",
  placeholder: "path",
} as const satisfies Argument
