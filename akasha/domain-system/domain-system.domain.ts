import type { Domain } from "./domain/domain.page-type.ts"

export const domainSystem = {
  id: "01a04a26-9105-7001-a1cc-60a031152982",
  pageTypeSlug: "domain",
  slug: "domain-system",
  definition: "how we define how things should be",
  partSlugs: ["page-type/domain", "page-type/finding", "domain/context-warrant"],
  design: [
    {
      invariantKind: "departure",
      statement: "Context a choice does not need does not reach the agent making it.",
    },
  ],
  intent: [
    {
      invariantKind: "gap",
      statement: "Agents have the context each choice needs at the time they make it.",
    },
  ],
} as const satisfies Domain
