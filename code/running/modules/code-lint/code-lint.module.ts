import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const codeLint = {
  id: "01a04edb-5f2c-7000-b8b5-430c5419cbda",
  type: "module",
  slug: "code-lint",
  definition:
    "running the linter over what is there and reading back what it found, changing nothing",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run's answer has the code the run exited with.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run's answer carries how many errors were counted.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run's answer carries every finding named.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run's answer carries where the run could not look and why.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run's answer has nothing more.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run whose answer cannot be read says why rather than an empty list.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The findings are read from the first line printed that parses as an object with diagnostics.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A root holding no linter is a run that was never made rather than a tree that came back clean.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The paths named are looked at in batches one command line holds.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The batches are read back as one answer.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A batch that could not be looked at answers for the whole run.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run is held to two processors rather than to every processor the machine has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run takes longer for being held there.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every run of the linter is held there, a run made to format among them.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "The linter is told how many processors to take by the environment it is given.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement:
        "Biome says of its own JSON reporter that the reporter is unstable and may change between patches.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "This module reads the JSON reporter anyway.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "That reporter is the only shape of Biome's answer a machine can take.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here says which rules run.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "The checks made are the checks the linter's configuration sets.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A run has no configuration of its own.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "How findings are reported is not answered here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "The printed output belongs to the caller that asked for the run.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement:
        "How much of the printed output a caller may have belongs to the caller that asked for the run.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "What exit follows belongs to the caller that asked for the run.",
    },
  ],
} as const satisfies Module
