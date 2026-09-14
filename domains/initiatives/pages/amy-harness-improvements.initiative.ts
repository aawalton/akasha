import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const amyHarnessImprovements = {
  id: "01a0923f-7f1e-7a24-8ed4-0f22b6840e04",
  type: "initiative",
  slug: "amy-harness-improvements",
  domain: "domain/alan-harness",
  persona: "amy",
  intentStack: [
    {
      statement:
        "The status line shows the workstation's processor and memory use before the Claude usage.",
    },
  ],

  constraints: [
    "This initiative stays when its last intent goes, rather than dying as a finished initiative does.",
  ],
} as const satisfies Initiative
