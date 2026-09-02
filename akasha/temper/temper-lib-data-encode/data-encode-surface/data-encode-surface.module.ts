import type { Module } from "@akasha/code-system/module"

export const dataEncodeSurface = {
  id: "01a06061-969e-7d0d-b494-268228c7f6a5",
  pageTypeSlug: "module",
  slug: "data-encode-surface",
  definition: "the calls and the alphabet another addon reaches this library by",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The surface names the library and the version of the library.",
    },
    {
      invariantKind: "departure",
      statement: "The alphabet and both lookups are handed out for another addon to read.",
    },
    {
      invariantKind: "departure",
      statement: "An empty table is handed out for another addon to keep working notes in.",
    },
  ],
} as const satisfies Module
