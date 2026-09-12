import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const amyHarnessImprovements = {
  id: "01a0923f-7f1e-7a24-8ed4-0f22b6840e04",
  type: "initiative",
  slug: "amy-harness-improvements",
  domain: "domain/alan-harness",
  persona: "amy",
  intents: [
    { statement: "Each app has a tile drawing the age of the stalest reading its tiles show." },
    { statement: "Tapping that tile reloads every tile of its app." },
    { statement: "Every tile's reloads are kept where the freshness tile can read them." },
    { statement: "The freshness tile draws what of those reloads is compact enough to draw." },
    { statement: "The heartbeat is set from the grant measured rather than from a guess." },
  ],
  constraints: [
    "This initiative stays when its last intent goes, rather than dying as a finished initiative does.",
  ],
} as const satisfies Initiative
