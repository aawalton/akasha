import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const page = {
  id: "01a0b7a0-c25d-7168-b9c7-299b00c4be72",
  type: "page-type/argument",
  slug: "page",
  said: "--page",
  takes: "a page, named by its page type and the slug that page is filed under",
  value: "text",
  placeholder: "page",
  createdAt: "2026-09-19T03:06:01.181Z",
  updatedAt: "2026-09-19T03:44:27.000Z",
} as const satisfies Argument
