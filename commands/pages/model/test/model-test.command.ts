import type { Command } from "akasha/commands/command.page-type.types.ts"

export const modelTest = {
  id: "01a09176-d8fc-77c3-bb9e-482aec38916d",
  type: "command",
  slug: "model-test",
  definition: "the command putting a model test's labelled cases to its model and scoring them",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A case nothing could be asked about is counted broken and reported as unreached.",
    },
    {
      invariantKind: "departure",
      statement: "A run scores the prompt of the test named rather than the cases of that test.",
    },
    {
      invariantKind: "departure",
      statement: "A run naming no other test uses the cases of the test named.",
    },
    {
      invariantKind: "departure",
      statement: "A case the model got wrong is reported with the answer the model gave.",
    },
    {
      invariantKind: "departure",
      statement: "A row shortens the answer, and the whole prompt and answer are asked for apart.",
    },
    {
      invariantKind: "departure",
      statement: "The prompt shown is the one the run put rather than one composed again to show.",
    },
    {
      invariantKind: "departure",
      statement: "A run answers a failure where any case is broken.",
    },
    {
      invariantKind: "departure",
      statement: "A broken case is the data's fault rather than the caller's.",
    },
    {
      invariantKind: "departure",
      statement: "A word past the test named is refused rather than passed over.",
    },
    {
      invariantKind: "absence",
      statement: "A run writes nothing.",
    },
  ],
  name: "test",
  timeout: 1800,
  arguments: [
    { argument: "argument/json" },
    { argument: "argument/model-test", required: true, saidAs: "word" },
    { argument: "argument/cases" },
    { argument: "argument/broken" },
    { argument: "argument/show" },
  ],
} as const satisfies Command
