import type { Domain } from "../../../domains/domain.page-type.types.ts"

export const changeAgentProse = {
  id: "01a0824b-410e-7fc8-a0c7-b605da7d2787",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "change-agent-prose",
  definition: "a change an agent reaches acting on the English a page states",
  parts: ["change-agent/change-prose-pattern"],
} as const satisfies Domain
