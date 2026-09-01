import type { Domain } from "../domain-system/domain/domain.page-type.ts"

export const change = {
  id: "01a05df1-e261-76a1-ad1e-0db3d857450e",
  pageTypeSlug: "domain",
  slug: "change",
  definition: "a set of edits to what akasha keeps, landed together",
  partSlugs: [
    "domain/agent-authored-change",
    "domain/agent-mechanical-change",
    "domain/service-operational-change",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A change is agent-authored or agent-mechanical or service-operational.",
    },
    {
      invariantKind: "departure",
      statement: "An akasha command makes every change a service does not.",
    },
    {
      invariantKind: "departure",
      statement: "What a change is judged by follows from which of the three it is.",
    },
  ],
} as const satisfies Domain
