import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const amyHarnessImprovements = {
  id: "01a0923f-7f1e-7a24-8ed4-0f22b6840e04",
  type: "initiative",
  slug: "amy-harness-improvements",
  domain: "domain/alan-harness",
  persona: "persona/amy",
  intentStack: [
    {
      statement: "An initiative is assigned to the seat its name begins with from the Work panel.",
      workingMemory:
        "Alan asked for an Assign option on the right click menu an initiative has in the code editor extension's Work panel, assigning that initiative to the seat its name begins with, where that seat is available and running. What available means beside running is unsettled.",
    },
  ],

  constraints: [
    "This initiative stays when its last intent goes, rather than dying as a finished initiative does.",
  ],
} as const satisfies Initiative
