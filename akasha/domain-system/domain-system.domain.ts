import type { Domain } from "./domain/domain.page-type.ts"

export const domainSystem = {
  id: "01a04a26-9105-7001-a1cc-60a031152982",
  pageTypeSlug: "domain",
  slug: "domain-system",
  definition: "how we define how things should be",
  partSlugs: ["page-type/domain", "page-type/finding"],
  requiredReadingSlugs: [],
  design: ["Context a choice does not need does not reach the agent making it."],
  intent: ["Agents have the context each choice needs at the time they make it."],
} as const satisfies Domain
