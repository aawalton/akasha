import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const amyHarnessImprovements = {
  id: "01a0923f-7f1e-7a24-8ed4-0f22b6840e04",
  type: "initiative",
  slug: "amy-harness-improvements",
  domain: "domain/alan-harness",
  persona: "amy",
  intents: [
    {
      statement:
        "The Stop hook names a seat's Claude Code session for that seat, so Alan sees who he is talking to.",
    },
  ],
  constraints: [
    "This initiative stays when its last intent goes, rather than dying as a finished initiative does.",
  ],
} as const satisfies Initiative
