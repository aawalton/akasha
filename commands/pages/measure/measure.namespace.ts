import type { Namespace } from "../../namespaces/namespace.page-type.types.ts"

export const measure = {
  id: "01a0796e-6072-74f0-b75e-599b54481bb7",
  pageTypeSlug: "namespace",
  type: "namespace",
  slug: "measure",
  definition: "what a thing has spent of what that thing is allowed",
  parts: [
    "command/measure-repo",
    "command/measure-pages",
    "command/measure-checks",
    "command/measure-changes",
    "command/measure-commands",
    "namespace/measure-claude-accounts",
    "command/measure-attributes",
    "command/measure-personas",
    "command/measure-learning",
  ],
} as const satisfies Namespace
