import type { Namespace } from "akasha/command/namespace/namespace.page-type.types.ts"

export const gap = {
  id: "01a0b7a0-c25d-727f-b19e-6d2fc2facd84",
  type: "page-type/namespace",
  slug: "gap",
  definition: "the gaps the pages state among their decisions",
  parts: ["command/gap-delete"],
  name: "gap",
} as const satisfies Namespace
