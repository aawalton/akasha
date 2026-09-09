import type { Module } from "@akasha/code/module"

export const testRunMarking = {
  id: "01a069c3-b0fd-7947-8715-46fad5843f53",
  pageTypeSlug: "module",
  type: "module",
  slug: "test-run-marking",
  definition: "marking a test run so a child it spawns refuses a live write as its parent would",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The test runner preloads this module rather than a test importing that module.",
    },
    {
      invariantKind: "departure",
      statement: "A child a test spawns has the mark the test run has.",
    },
    {
      invariantKind: "departure",
      statement: "The mark is the name the live store write guard reads.",
    },
    {
      invariantKind: "absence",
      statement: "The module declares no name a test reaches for.",
    },
  ],
} as const satisfies Module
