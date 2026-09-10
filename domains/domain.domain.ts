import type { Domain } from "./domain.page-type.types.ts"

export const domain = {
  id: "01a04a26-9105-7001-a1cc-60a031152982",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "domain",
  definition: "how we define how things should be",
  parts: [
    "module/domain-rows",
    "module/work-initiatives",
    "page-type/domain",
    "page-type/finding",
    "page-type/initiative",
    "page-type/invariant-group",
    "page-type/list",
    "page-type/invariant-kind",
    "page-type/directive-kind",
    "page-type/taboo-term",
    "page-type/sentence-shape",
    "domain/plain-language",
    "domain/standard-agent-english",
    "domain/domain-purpose",
    "domain/domain-champions",
    "domain/domain-parent",
    "module/domain-reading",
  ],
  invariants: [
    {
      invariantKind: "gap",
      statement: "Everything Alan wants done is a finding or an intent.",
    },

    {
      invariantKind: "departure",
      statement: "Context a choice does not need does not reach the agent making that choice.",
    },
    {
      invariantKind: "gap",
      statement:
        "Agents have the context each choice needs at the time those agents make that choice.",
    },
    {
      invariantKind: "departure",
      statement: "A seat's attributes represent the choices that seat will make.",
    },
  ],
} as const satisfies Domain
