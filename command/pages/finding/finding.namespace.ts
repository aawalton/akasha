import type { Namespace } from "akasha/command/namespace/namespace.page-type.types.ts"

export const finding = {
  id: "01a0b7a0-c25d-7c1b-836a-c8880d8135dd",
  type: "page-type/namespace",
  slug: "finding",
  definition: "the findings recorded against their domains",
  parts: ["command/finding-delete"],
  name: "finding",
  createdAt: "2026-09-19T03:06:01.181Z",
  updatedAt: "2026-09-22T13:48:12.000Z",
} as const satisfies Namespace
