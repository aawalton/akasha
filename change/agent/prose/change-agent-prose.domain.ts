import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const changeAgentProse = {
  id: "01a0824b-410e-7fc8-a0c7-b605da7d2787",
  type: "page-type/domain",
  slug: "change-agent-prose",
  definition: "a change an agent makes to prose on every page",
  parts: ["change-agent/change-prose-pattern"],
} as const satisfies Domain
