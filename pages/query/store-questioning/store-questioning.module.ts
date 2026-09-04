import type { Module } from "@akasha/code-system/module"

export const storeQuestioning = {
  id: "01a05aec-eaaa-7127-aa3c-7494fc98ae9b",
  pageTypeSlug: "module",
  slug: "store-questioning",
  definition: "a composed query put to the store, and the answer its callers already spell",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A query names its page type under the key its callers already spell.",
    },
    {
      invariantKind: "departure",
      statement: "A test the store runs the same way is sent to the store.",
    },
    {
      invariantKind: "departure",
      statement: "A test the store does not run is run over the rows here.",
    },
    {
      invariantKind: "departure",
      statement: "A test named in no vocabulary is refused rather than dropped.",
    },
    {
      invariantKind: "departure",
      statement:
        "Nothing is skipped or taken by the store where a test still stands to be run here.",
    },
    {
      invariantKind: "departure",
      statement: "Grouping counts the rows falling under each set of keys.",
    },
    {
      invariantKind: "departure",
      statement: "A sum or a mean passes over what holds no number.",
    },
    {
      invariantKind: "departure",
      statement: "A row is answered under `values` though the store answers the row flat.",
    },
    {
      invariantKind: "absence",
      statement: "No answered value is parsed again as JSON.",
    },
  ],
} as const satisfies Module
