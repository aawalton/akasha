import type { Module } from "@akasha/code-system/module"

export const readoutAsking = {
  id: "01a061c0-e7cc-7ec9-b512-033fcde733e7",
  pageTypeSlug: "module",
  slug: "readout-asking",
  definition: "the asking a readout reaches the store through",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A readout is handed its asking rather than holding one.",
    },
    {
      invariantKind: "departure",
      statement: "An answer is a refusal or rows rather than rows that may be missing.",
    },
    {
      invariantKind: "departure",
      statement: "A store that refuses is a fault rather than a reading of nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A fault names what could not be read ahead of the store's own words.",
    },
    {
      invariantKind: "departure",
      statement: "A question no row answers is no row rather than a fault.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a value out of a row.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here names a readout.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here names a page type.",
    },
  ],
} as const satisfies Module
