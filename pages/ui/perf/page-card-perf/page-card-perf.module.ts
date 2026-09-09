import type { Module } from "@akasha/code/module"

export const pageCardPerf = {
  id: "01a0610c-430e-758f-9da6-bed7278e0bdb",
  pageTypeSlug: "module",
  slug: "page-card-perf",
  definition: "one page-card edit timed from click through visible, stored and settled",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The readings put on the window are read by a console rather than by code.",
    },
  ],
} as const satisfies Module
