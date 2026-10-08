import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const finding = {
  id: "01a0b7a0-c25d-78fb-b584-8b4fdf5ca948",
  type: "page-type/argument",
  slug: "finding",
  said: "--finding",
  takes: "a finding, named by the slug that finding is filed under",
  value: "text",
  placeholder: "finding",
  createdAt: "2026-09-19T03:06:01.181Z",
  updatedAt: "2026-09-19T03:44:27.000Z",
} as const satisfies Argument
