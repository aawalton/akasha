import type { Module } from "@akasha/code/module"

export const targetNarrowing = {
  id: "01a0825b-c6ad-78e4-9391-698b96bafb0c",
  pageTypeSlug: "module",
  type: "module",
  slug: "target-narrowing",
  definition: "whether one change target subtype narrows another",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A subtype narrows itself.",
    },
    {
      invariantKind: "departure",
      statement: "A subtype narrows every subtype its parent narrows.",
    },
    {
      invariantKind: "departure",
      statement: "The parent a subtype names is read off the index.",
    },
    {
      invariantKind: "departure",
      statement: "A parent is named as an address, and the slug is the part past the page type.",
    },
    {
      invariantKind: "departure",
      statement: "A subtype naming no parent narrows nothing above itself.",
    },
    {
      invariantKind: "departure",
      statement: "A subtype the index files no page for narrows nothing above itself.",
    },
    {
      invariantKind: "departure",
      statement: "A chain of parents coming back on itself is walked once.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the disk.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a path.",
    },
  ],
} as const satisfies Module
