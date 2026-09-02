import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const esoCloneArtifacts = {
  id: "01a06297-7f6a-7b4f-8b63-338e820e7c30",
  pageTypeSlug: "module",
  slug: "eso-clone-artifacts",
  definition: "the generated files under a tree that carry an ESO clone provenance line",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A file is generated where a path segment says so or the name carries the mark.",
    },
    {
      invariantKind: "constraint",
      statement: "The count of files searched is kept apart from the count of artifacts found.",
    },
  ],
} as const satisfies Module
