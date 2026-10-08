import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const changeAgentProse = {
  id: "01a0824b-410e-7fc8-a0c7-b605da7d2787",
  type: "page-type/domain",
  slug: "change-agent-prose",
  definition: "a change an agent makes to prose on every page",
  parts: ["change-agent/change-prose-pattern"],
  createdAt: "2026-09-08T18:32:45.070Z",
  updatedAt: "2026-09-25T13:31:57.000Z",
} as const satisfies Domain
