import type { Module } from "@akasha/code-system/module"

export const mediaCasts = {
  id: "01a06069-f8c1-7b1c-8814-7f8f27501204",
  pageTypeSlug: "module",
  slug: "media-casts",
  definition: "the assertion handing the untyped global table to TypeScript as a named shape",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "No cast here changes a value.",
    },
  ],
} as const satisfies Module
