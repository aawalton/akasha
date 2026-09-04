import type { Module } from "@akasha/code-system/module"

export const removeManifesting = {
  id: "01a06cae-c0e6-7131-b018-ad2125eea727",
  pageTypeSlug: "module",
  slug: "remove-manifesting",
  definition: "a package manifest with the ways in dropped whose files a removal takes",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A way in whose file the removal takes is dropped in the same commit.",
    },
    {
      invariantKind: "departure",
      statement: "A way in whose file the removal leaves keeps its place.",
    },
    {
      invariantKind: "departure",
      statement: "Every manifest above what goes is read.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest the removal itself takes is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A way in is resolved against the folder its manifest sits in.",
    },
    {
      invariantKind: "departure",
      statement: "An entry is cut out by the span the entry occupies.",
    },
    {
      invariantKind: "departure",
      statement: "The rest of the manifest keeps the shape the manifest had.",
    },
    {
      invariantKind: "absence",
      statement: "A manifest that will not parse has no way in dropped.",
    },
    {
      invariantKind: "absence",
      statement: "A way in holding something other than a string is left alone.",
    },
    {
      invariantKind: "gap",
      statement: "A way in holding a record of conditions has the landings that record names read.",
    },
  ],
} as const satisfies Module
