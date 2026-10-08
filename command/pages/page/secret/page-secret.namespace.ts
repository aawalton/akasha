import type { Namespace } from "akasha/command/namespace/namespace.page-type.types.ts"

export const pageSecret = {
  id: "01a07bc6-efea-754e-b4cc-6744893bc509",
  type: "page-type/namespace",
  slug: "page-secret",
  definition: "a value a page carries that the files hide",
  parts: [
    "command/page-secret-clear",
    "command/page-secret-list",
    "command/page-secret-set",
    "command/page-secret-show",
  ],
  name: "secret",
  createdAt: "2026-09-07T12:10:30.250Z",
  updatedAt: "2026-09-15T15:51:21.000Z",
} as const satisfies Namespace
