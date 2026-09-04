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
      statement: "Nothing here is trained.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says what a sentence means.",
    },
  ],
} as const satisfies WorkspacePackage
