import type { Namespace } from "../namespace.page-type.ts"

export const measure = {
  id: "01a0796e-6072-74f0-b75e-599b54481bb7",
  pageTypeSlug: "namespace",
  slug: "measure",
  definition: "what a thing has spent of what that thing is allowed",
  partSlugs: [
    "command/measure-repo",
    "command/measure-pages",
    "command/measure-checks",
    "namespace/measure-claude-accounts",
    "command/measure-attributes",
    "command/measure-learning",
  ],
} as const satisfies Namespace
