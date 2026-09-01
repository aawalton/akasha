import type { Domain } from "../../domain-system/domain/domain.page-type.ts"

export const change = {
  id: "01a05df1-e261-76a1-ad1e-0db3d857450e",
  pageTypeSlug: "domain",
  slug: "change",
  definition: "everything one act edits",
  partSlugs: ["page-type/change-kind"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Nothing lands but through an akasha command or a service.",
    },
    {
      invariantKind: "departure",
      statement: "What a change is judged by follows from its kind.",
    },
    {
      invariantKind: "departure",
      statement: "No service lands a body an agent composed.",
    },
  ],
} as const satisfies Domain
