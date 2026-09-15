import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const modelProviderReading = {
  id: "01a0a534-b50b-7f9a-ac9b-140bd34880b7",
  type: "module",
  slug: "model-provider-reading",
  definition: "what a model-provider has",
  code: "ts",
  test: "ts",
  pageBodyReaders: ["providerValuesIn"],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A provider is found through the page type reached by its id rather than by a spelled slug.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A provider named as an account names it is read by the slug after the type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A provider no page is filed for is answered as none.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "The repository root reaches every reader here as a parameter.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here fetches.",
    },
  ],
} as const satisfies Module
