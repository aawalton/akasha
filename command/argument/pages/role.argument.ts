import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const role = {
  id: "01a094e6-e0f0-70a0-98b4-057e2016a0f5",
  type: "page-type/argument",
  slug: "role",
  said: "--role",
  takes: "what this seat does, outranking the persona's own role",
  value: "text",
  placeholder: "slug",
  createdAt: "2026-09-12T09:15:53.968Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
