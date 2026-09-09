import type { Domain } from "../domain.page-type.ts"

export const plainLanguage = {
  id: "01a05d93-dbec-79d5-a299-9264b3de7464",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "plain-language",
  definition: "whether a sentence is written in plain language",
  parts: [
    "module/parse-doubt",
    "module/shape-reading",
    "module/spelt-scanning",
    "module/dependency-graph",
    "module/word-tokenizing",
    "module/shape-predicate",
    "module/onnx-parsing",
    "module/parse-cache",
    "page-type/parser-model",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A sentence a refused shape matches is not plain.",
    },
    {
      invariantKind: "departure",
      statement: "A sentence refused for a construction Alan calls plain is a gap in the shapes.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing here states a sentence's meaning.",
    },
    {
      invariantKind: "departure",
      statement: "A trained model commits to one tree rather than ranking several trees.",
    },
    {
      invariantKind: "gap",
      statement: "A statement is read alone rather than beside the statements sharing its file.",
    },
  ],
} as const satisfies Domain
