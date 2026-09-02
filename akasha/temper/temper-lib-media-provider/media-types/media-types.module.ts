import type { Module } from "@akasha/code-system/module"

export const mediaTypes = {
  id: "01a06069-f8c7-7dd2-9906-92908c73801c",
  pageTypeSlug: "module",
  slug: "media-types",
  definition: "the shapes a media table, a media kind and the shared library take",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A media kind is named by a lower-case word.",
    },
    {
      invariantKind: "departure",
      statement: "A key on the shared table is what another addon reads.",
    },
  ],
} as const satisfies Module
