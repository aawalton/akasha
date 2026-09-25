import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const plainLanguage = {
  id: "01a05d93-dbec-79d5-a299-9264b3de7464",
  type: "page-type/domain",
  slug: "plain-language",
  definition: "whether prose is written in plain language",
  parts: [
    "domain/standard-agent-english",
    "module/dependency-graph",
    "module/onnx-parsing",
    "module/parse-cache",
    "module/word-tokenizing",
    "page-type/parser-model",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A sentence a refused shape matches is not plain.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sentence refused for a construction Alan calls plain is a gap in the shapes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing here states a sentence's meaning.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A trained model commits to one tree rather than ranking several trees.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A statement is read alone rather than beside the statements sharing its file.",
    },
  ],
} as const satisfies Domain
