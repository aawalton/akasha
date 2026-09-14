import type { ModelTest } from "akasha/agents/model/test/model-test.page-type.types.ts"

export const restatement = {
  id: "01a05a0b-3a49-7019-a1b3-203a1b2c9625",
  type: "model-test",
  slug: "restatement",
  definition: "whether a departure says again what its page's name and definition already say",
  modelFamily: "model-family/haiku",
  prompt:
    'You are looking at a page named {page} with a definition of "{definition}".\n\nIs the following statement obvious from the name and definition? YES/NO\n\n{statement}',
  code: "ts",
  cases: "jsonl",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A departure obvious from its page is a departure the reader would have guessed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only a departure is judged.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A gap reads as obvious when the gap is right.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An absence reads as obvious when the absence is right.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page with no definition is judged by nothing here.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement:
        "This test reads the words rather than the meaning a reader would build from the words.",
    },
  ],
} as const satisfies ModelTest
