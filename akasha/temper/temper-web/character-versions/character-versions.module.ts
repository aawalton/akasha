import type { Module } from "@akasha/code-system/module"

export const characterVersions = {
  id: "01a0640f-8510-7b02-a43e-c5d9c8d78e3f",
  pageTypeSlug: "module",
  slug: "character-versions",
  definition: "the saved versions of one character build, fetched from a browser",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An answer that does not narrow is refused rather than passed on part-read.",
    },
    {
      invariantKind: "departure",
      statement: "A failure comes back as a message rather than as a raised error.",
    },
  ],
} as const satisfies Module
