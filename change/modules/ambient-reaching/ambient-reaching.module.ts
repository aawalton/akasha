import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ambientReaching = {
  id: "01a0d5c2-d5fe-740e-83ca-37572a2af88f",
  type: "page-type/module",
  slug: "ambient-reaching",
  definition: "the declarations a file's ambient names reach",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The declarations are read from the index as files carrying ambient types.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Only a name the parse reads as a reference nothing in the file binds is looked for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name a file reaches on `globalThis` is looked for too.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every declaration declaring a name reached is answered, and what it reaches in turn.",
    },
  ],
} as const satisfies Module
