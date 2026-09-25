import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const modelProviderReading = {
  id: "01a0a534-b50b-7f9a-ac9b-140bd34880b7",
  type: "page-type/module",
  slug: "model-provider-reading",
  definition: "how code reads the page of a model provider",
  code: "ts",
  test: "ts",
  pageBodyReaders: ["providerValuesIn"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A provider is found through the page type reached by its id rather than by a spelled slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A provider named as an account names it is read by the slug after the type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A provider no page is filed for is answered as none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A provider stating no model of its own is answered as none.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The repository root reaches every reader here as a parameter.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here fetches.",
    },
  ],
} as const satisfies Module
