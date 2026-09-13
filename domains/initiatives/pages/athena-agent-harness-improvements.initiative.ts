import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const athenaAgentHarnessImprovements = {
  id: "01a09c1b-9d7b-7521-8fac-00e1d82bcaf6",
  type: "initiative",
  slug: "athena-agent-harness-improvements",
  domain: "domain/agent",
  persona: "athena",
  intents: [
    { statement: "A domain beside the seat page type names everything done to a seat." },
    { statement: "Each thing done to a seat is a domain naming the modules that do it." },
    { statement: "Each thing a supervisor does is a domain naming the modules that do it." },
  ],
} as const satisfies Initiative
