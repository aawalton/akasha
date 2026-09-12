import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const domain = {
  id: "01a04a26-9105-7001-a1cc-60a031152982",
  type: "domain",
  slug: "domain",
  definition: "how we define how things should be",
  parts: [
    "domain/context",
    "domain/domain-champions",
    "domain/domain-parent",
    "domain/domain-purpose",
    "domain/plain-language",
    "domain/standard-agent-english",
    "module/domain-reading",
    "module/domain-rows",
    "module/work-initiatives",
    "page-type/directive-kind",
    "page-type/domain",
    "page-type/finding",
    "page-type/initiative",
    "page-type/invariant-group",
    "page-type/invariant-kind",
    "page-type/list",
    "page-type/sentence-shape",
    "page-type/taboo-term",
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
