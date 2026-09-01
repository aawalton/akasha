import type { Module } from "@akasha/code-system/module"

export const cutFingerprint = {
  id: "01a05cee-e560-7983-b66b-92a291823499",
  pageTypeSlug: "module",
  slug: "cut-fingerprint",
  definition: "the fingerprint a taken cut is remembered by",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A cut fingerprint is kept as a `mobile-cut` page rather than in a file.",
    },
    {
      invariantKind: "departure",
      statement: "The last cut is the `mobile-cut` page carrying the highest build number.",
    },
    {
      invariantKind: "departure",
      statement:
        "A fingerprint carrying no build input tree hash predates the basis cuts are judged by.",
    },
    {
      invariantKind: "departure",
      statement:
        "A cut is owed where the current build input tree hash differs from the last cut's.",
    },
    {
      invariantKind: "departure",
      statement: "A newest cut page that will not parse raises rather than reading as no cut.",
    },
  ],
} as const satisfies Module
