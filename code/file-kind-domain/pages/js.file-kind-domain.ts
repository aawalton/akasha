import type { FileKindDomain } from "akasha/code/file-kind-domain/file-kind-domain.page-type.types.ts"

export const js = {
  id: "01a0d58a-70ad-7d6b-88a5-8e5b98d72892",
  type: "page-type/file-kind-domain",
  slug: "js",
  definition: "a file of JavaScript source",
  namePatterns: ["*.js", "*.cjs", "*.mjs"],
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "This kind says nothing of which module system loads a JavaScript file.",
    },
  ],
} as const satisfies FileKindDomain
