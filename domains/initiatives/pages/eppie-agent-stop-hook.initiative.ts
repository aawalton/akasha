import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const eppieAgentStopHook = {
  id: "01a091af-b1f9-7864-84c4-4f36df8762d6",
  pageTypeSlug: "initiative",
  type: "initiative",
  slug: "eppie-agent-stop-hook",
  domain: "domain/hook",
  persona: "eppie",
} as const satisfies Initiative
