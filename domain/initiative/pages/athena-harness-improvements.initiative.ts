import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const athenaHarnessImprovements = {
  id: "01a0a5d8-e7a3-725d-8312-d1544c8a9c94",
  type: "initiative",
  slug: "athena-harness-improvements",
  domain: "page-type/agent",
  persona: "persona/athena",
  intentStack: [],
  constraints: [
    "This initiative stays when its last intent goes, rather than dying as a finished initiative does.",
  ],
} as const satisfies Initiative
