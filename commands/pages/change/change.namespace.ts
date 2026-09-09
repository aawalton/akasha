import type { Namespace } from "../../namespaces/namespace.page-type.ts"

export const change = {
  id: "01a0814e-a6ed-7570-b81f-ebad640d95f2",
  pageTypeSlug: "namespace",
  slug: "change",
  definition: "the edits an agent keeps, and what becomes of them",
  parts: [
    "command/change-show",
    "command/change-list",
    "command/change-drop",
    "command/change-take",
    "command/change-draft",
    "command/change-apply",
  ],
} as const satisfies Namespace
