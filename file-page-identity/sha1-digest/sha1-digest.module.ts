import type { Module } from "../../code-system/modules/module.page-type.ts"

export const sha1Digest = {
  id: "01a05d42-bbcb-7988-8b8e-e0a7b0f48b07",
  pageTypeSlug: "module",
  slug: "sha1-digest",
  definition: "the sha1 digest of some bytes, worked out in TypeScript and nothing else",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A digest is byte-identical to what `node:crypto` answers for the same bytes.",
    },
    {
      invariantKind: "departure",
      statement: "A digest is answered rather than promised.",
    },
    {
      invariantKind: "departure",
      statement: "Text becomes bytes as UTF-8.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches a crypto library the platform carries.",
    },
  ],
} as const satisfies Module
