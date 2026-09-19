import type { Namespace } from "akasha/command/namespace/namespace.page-type.types.ts"

export const finding = {
  id: "01a0b7a0-c25d-7c1b-836a-c8880d8135dd",
  type: "page-type/namespace",
  slug: "finding",
  definition: "the findings recorded against the domains each one is of",
  parts: ["command/finding-delete"],
  name: "finding",
} as const satisfies Namespace
