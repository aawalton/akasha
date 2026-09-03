import type { Module } from "@akasha/code-system/module"

export const closureReach = {
  id: "01a0685e-023f-7004-abfa-e702446349cd",
  pageTypeSlug: "module",
  slug: "closure-reach",
  definition: "whether the closure a set of seeds reaches meets any of a pipeline's changed files",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A membership covering everything meets a changed file without asking the graph.",
    },
    {
      invariantKind: "departure",
      statement: "A membership covering nothing meets no changed file, however many there are.",
    },
    {
      invariantKind: "departure",
      statement: "A path is asked of the code repo rather than of the repo the caller stands in.",
    },
  ],
} as const satisfies Module
