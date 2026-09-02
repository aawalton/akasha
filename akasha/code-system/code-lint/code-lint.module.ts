import type { Module } from "../modules/module.page-type.ts"

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
      statement: "A run's answer carries what the run exited.",
    },
    {
      invariantKind: "departure",
      statement: "A run's answer carries how many errors were counted.",
    },
    {
      invariantKind: "departure",
      statement: "A run's answer carries every finding named.",
    },
    {
      invariantKind: "departure",
      statement: "A run's answer carries where the run could not look and why.",
    },
    {
      invariantKind: "departure",
      statement: "A run's answer carries nothing more.",
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
        "A root holding no linter is a run that was never made rather than a tree that came back clean.",
    },
    {
      invariantKind: "constraint",
      statement:
        "Biome says of its own JSON reporter that the reporter is unstable and may change between patches.",
    },
    {
      invariantKind: "constraint",
      statement: "This module reads the JSON reporter anyway.",
    },
    {
      invariantKind: "constraint",
      statement: "It is the only shape of its answer a machine can take.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says which rules run.",
    },
    {
      invariantKind: "absence",
      statement: "What is checked is what the linter is configured by.",
    },
    {
      invariantKind: "absence",
      statement: "A run carries no configuration of its own.",
    },
    {
      invariantKind: "absence",
      statement: "How findings are reported is not answered here.",
    },
    {
      invariantKind: "absence",
      statement: "What is printed belongs to whoever asked for the run.",
    },
    {
      invariantKind: "absence",
      statement:
        "How much of what is printed a caller may hold belongs to whoever asked for the run.",
    },
    {
      invariantKind: "absence",
      statement: "What exit follows belongs to whoever asked for the run.",
    },
  ],
} as const satisfies Module
