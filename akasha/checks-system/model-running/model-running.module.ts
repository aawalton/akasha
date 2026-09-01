import type { Module } from "@akasha/code-system/module"

export const modelRunning = {
  id: "01a05a43-f8db-7c07-80be-5c8b8867ea70",
  pageTypeSlug: "module",
  slug: "model-running",
  definition: "the model checks the index names, gathered so a runner can run them",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A model check is gathered beside the code checks rather than by a runner of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A count of runs above no runs is the phase a check runs on.",
    },
    {
      invariantKind: "departure",
      statement: "A statement standing in the body before the change is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A page whose definition the change alters has every statement judged again.",
    },
    {
      invariantKind: "departure",
      statement: "The call is spawned rather than awaited.",
    },
    {
      invariantKind: "departure",
      statement: "A check answers before a promise would settle.",
    },
    {
      invariantKind: "departure",
      statement: "A model reached by no call leaves the change unjudged rather than refusing it.",
    },
    {
      invariantKind: "departure",
      statement: "An answer that cannot be read is a model reached by no call.",
    },
    {
      invariantKind: "departure",
      statement: "An answer opening with yes is a refusal.",
    },
    {
      invariantKind: "departure",
      statement: "A statement answered yes is asked no further.",
    },
    {
      invariantKind: "departure",
      statement:
        "A root naming no model check is answered with no model checks rather than refused.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says what makes a statement bad.",
    },
    {
      invariantKind: "stopgap",
      statement: "A check counting runs for both phases spends its patch count at audit.",
    },
    {
      invariantKind: "stopgap",
      statement: "A check that did not run says so on standard error alone.",
    },
    {
      invariantKind: "gap",
      statement: "A run knows which phase the run was reached from.",
    },
    {
      invariantKind: "gap",
      statement: "A check that did not run says so in the report and in the commit.",
    },
  ],
} as const satisfies Module
