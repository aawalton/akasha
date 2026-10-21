import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const changeAgentPage = {
  id: "01a0d90f-61b7-7f22-b661-78aa1a3e8fc7",
  type: "page-type/domain",
  slug: "change-agent-page",
  definition: "a change an agent makes to a whole page",
  parts: [
    "change-agent/rename-page",
    "change-agent/rename-pages",
    "change-agent/pin-stat-case",
    "change-agent/generate-foods-and-drinks",
    "change-agent/pin-stat-case-gaps",
    "change-agent/pin-tooltip-case",
    "change-agent/pin-tooltip-case-gaps",
    "change-agent/restate-tooltip-cases",
  ],
  createdAt: "2026-09-25T14:54:19.063Z",
  updatedAt: "2026-10-21T03:34:20.099Z",
} as const satisfies Domain
