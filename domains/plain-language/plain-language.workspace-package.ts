import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const plainLanguage = {
  id: "01a05d93-dbec-79d5-a299-9264b3de7464",
  pageTypeSlug: "workspace-package",
  slug: "plain-language",
  definition: "whether a sentence is written in plain language",
  manifest: "json",
  partSlugs: [
    "module/word-classing",
    "module/phrase-parsing",
    "module/shape-reading",
    "module/plain-grammar",
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
      statement: "A sentence the grammar refuses is not plain.",
    },
    {
      invariantKind: "departure",
      statement: "A construction Alan has refused is out of the plain grammar.",
    },
    {
      invariantKind: "departure",
      statement: "A sentence refused for a construction Alan calls plain is a gap in the grammar.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing here says what a sentence means.",
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
} as const satisfies WorkspacePackage
