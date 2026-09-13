import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const amyHarnessImprovements = {
  id: "01a0923f-7f1e-7a24-8ed4-0f22b6840e04",
  type: "initiative",
  slug: "amy-harness-improvements",
  domain: "domain/alan-harness",
  persona: "amy",
  intents: [
    { statement: "The editor has a panel named Services." },
    { statement: "The Services panel's roots are the kinds of service." },
    { statement: "A service is drawn beneath the kind of service that service is." },
    { statement: "A service's row takes its color from that service's verdict." },
    { statement: "A service that is well is green." },
  ],

  constraints: [
    "This initiative stays when its last intent goes, rather than dying as a finished initiative does.",
  ],
} as const satisfies Initiative
