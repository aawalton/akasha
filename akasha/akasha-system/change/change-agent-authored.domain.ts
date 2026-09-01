import type { Domain } from "../../domain-system/domain/domain.page-type.ts"

export const changeAgentAuthored = {
  id: "01a05df1-e262-7648-bbe1-061d37bd706d",
  pageTypeSlug: "domain",
  slug: "change-agent-authored",
  definition: "a change an agent composes",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A change made by an akasha command stating `mechanical` false is agent-authored.",
    },
    {
      invariantKind: "departure",
      statement: "An agent-authored change is judged by the checks.",
    },
    {
      invariantKind: "departure",
      statement: "An agent-authored change is refused until its required reading is read.",
    },
  ],
} as const satisfies Domain
