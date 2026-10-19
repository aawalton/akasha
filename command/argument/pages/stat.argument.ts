import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const stat = {
  id: "01a155d4-d19b-7ccf-b564-fad376843e7d",
  type: "page-type/argument",
  slug: "stat",
  said: "--stat",
  takes: "the one stat shown, named by its slug",
  value: "text",
  placeholder: "stat",
  createdAt: "2026-10-19T20:22:53.082Z",
  updatedAt: "2026-10-19T20:22:53.082Z",
} as const satisfies Argument
