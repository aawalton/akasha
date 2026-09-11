import type { Command } from "akasha/commands/command.page-type.types.ts"

export const modelTest = {
  id: "01a09176-d8fc-77c3-bb9e-482aec38916d",
  type: "command",
  slug: "model-test",
  definition: "the command putting a model test's labelled cases to its model and scoring them",
  code: "ts",
  test: "ts",
  changeKind: "change-none",
  taking: [
    { said: "<test>", takes: "the model test whose prompt is put to the model" },
    { said: "--cases <test>", takes: "the model test whose cases are used, its own by default" },
    { said: "--broken", takes: "the cases the model got wrong and no others" },
    { said: "--json", takes: "the answer as one JSON object rather than as rows" },
    { said: "--show", takes: "the whole prompt put for each case shown and the whole answer back" },
  ],
  helpNotes: [
    "a rival prompt is weighed by running it over the cases of the test it rivals, so both are scored on the same cases.",
    "a case nothing could be asked about is counted broken and marked unreached, because nothing asked answers nothing.",
    "a run costs one model call for every thing a test asks about a case, so a test asking every rule multiplies the bill.",
  ],
  invariants: [
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
      statement: "A word past the test named is refused rather than passed over.",
    },
    {
      invariantKind: "absence",
      statement: "A run writes nothing.",
    },
  ],
} as const satisfies Command
