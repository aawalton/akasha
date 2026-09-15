import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const targetNarrowing = {
  id: "01a0825b-c6ad-78e4-9391-698b96bafb0c",
  type: "module",
  slug: "target-narrowing",
  definition: "whether one change target subtype narrows another",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A subtype narrows itself.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A subtype narrows every subtype its parent narrows.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The parent a subtype names is read off the index.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A parent is named as an address.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The slug is the part of that address past the page type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A subtype naming no parent narrows nothing above itself.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A subtype the index files no page for narrows nothing above itself.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A chain of parents coming back on itself is walked once.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads the disk.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a path.",
    },
  ],
} as const satisfies Module
