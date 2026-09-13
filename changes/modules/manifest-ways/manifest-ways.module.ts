import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const manifestWays = {
  id: "01a09b81-967d-77b4-b2fa-dd03deb0986c",
  type: "module",
  slug: "manifest-ways",
  definition: "a manifest's ways in rewritten to follow the files those ways in name",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A way in follows the file that way in names.",
    },
    {
      invariantKind: "departure",
      statement: "A way in whose file lands outside the package is dropped.",
    },
    {
      invariantKind: "departure",
      statement: "A way in is rewritten by splicing the manifest's text.",
    },
    {
      invariantKind: "departure",
      statement: "The manifest keeps the spacing the manifest already carries.",
    },
    {
      invariantKind: "departure",
      statement: "Every way in is read against the folder the manifest arrives in.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest landing elsewhere is answered as a move rather than as a write.",
    },
    {
      invariantKind: "departure",
      statement: "A body reading as no JSON object is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest stating no way in is answered as no edit.",
    },
    {
      invariantKind: "departure",
      statement: "The body is answered rather than written.",
    },
    {
      invariantKind: "departure",
      statement: "Each passage answered runs over the ways in changed whose lines meet.",
    },
    {
      invariantKind: "departure",
      statement: "The body is read through the reader handed in rather than through a world.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here looks for the manifests above a path that moved.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the disk or an index.",
    },
    {
      invariantKind: "departure",
      statement: "A change wanting these edits reads them here rather than from another change.",
    },
  ],
} as const satisfies Module
