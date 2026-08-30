import type { Module } from "../module/module.page-type.ts"

export const codeLint = {
  id: "01a04edb-5f2c-7000-b8b5-430c5419cbda",
  pageTypeSlug: "module",
  slug: "code-lint",
  definition:
    "running the linter over what stands and reading back what it found, changing nothing",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A run is answered whole: what it exited, how many errors were counted, every finding named, and why it could not look where it could not.",
    },
    {
      invariantKind: "departure",
      statement: "A run only reads. No fix, no write and no unsafe change is ever asked for.",
    },
    {
      invariantKind: "departure",
      statement: "A run whose answer cannot be read says why rather than an empty list.",
    },
    {
      invariantKind: "departure",
      statement:
        "The findings are read from the first line printed that parses as an object carrying diagnostics.",
    },
    {
      invariantKind: "departure",
      statement:
        "A root holding no linter is a run that was never made, not a tree that came back clean.",
    },
    {
      invariantKind: "constraint",
      statement:
        "Biome says of its own JSON reporter that it is unstable and may change between patches. We read it anyway; it is the only shape of its answer a machine can take.",
    },
    {
      invariantKind: "absence",
      statement:
        "Nothing here says which rules run. What is checked is what the linter is configured by, and a run carries no configuration of its own.",
    },
    {
      invariantKind: "absence",
      statement:
        "How findings are reported is not answered here. What is printed, how much of it a caller may hold, and what exit follows belong to whoever asked for the run.",
    },
  ],
} as const satisfies Module
