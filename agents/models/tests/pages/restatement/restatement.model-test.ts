import type { ModelTest } from "../../model-test.page-type.ts"

export const restatement = {
  id: "01a05a0b-3a49-7019-a1b3-203a1b2c9625",
  pageTypeSlug: "model-test",
  slug: "restatement",
  definition: "whether a departure says again what its page's name and definition already say",
  modelFamilySlug: "model-family/haiku",
  prompt:
    'You are looking at a page named {page} with a definition of "{definition}".\n\nIs the following statement obvious from the name and definition? YES/NO\n\n{statement}',
  code: "ts",
  cases: "jsonl",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A departure obvious from its page is a departure the reader would have guessed.",
    },
    {
      invariantKind: "departure",
      statement: "Only a departure is judged.",
    },
    {
      invariantKind: "departure",
      statement: "A gap reads as obvious when the gap is right.",
    },
    {
      invariantKind: "departure",
      statement: "An absence reads as obvious when the absence is right.",
    },
    {
      invariantKind: "departure",
      statement: "A page carrying no definition is judged by nothing here.",
    },
    {
      invariantKind: "constraint",
      statement:
        "What this test reads is the words rather than what a reader would build from the words.",
    },
  ],
} as const satisfies ModelTest
