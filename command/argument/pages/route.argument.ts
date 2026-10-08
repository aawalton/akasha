import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const route = {
  id: "01a094bc-bb9c-7f6e-b0a1-d3f7f1111f93",
  type: "page-type/argument",
  slug: "route",
  said: "--route",
  takes: "the route named, such as `/home` or a page's own path",
  value: "text",
  placeholder: "path",
  createdAt: "2026-09-12T08:29:51.900Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
