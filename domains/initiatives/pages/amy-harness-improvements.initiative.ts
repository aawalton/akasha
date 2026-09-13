import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const amyHarnessImprovements = {
  id: "01a0923f-7f1e-7a24-8ed4-0f22b6840e04",
  type: "initiative",
  slug: "amy-harness-improvements",
  domain: "domain/alan-harness",
  persona: "amy",
  intents: [
    {
      statement: "A subagent is stopped from the agents panel, as a seat is.",
    },
    {
      statement:
        "Alan's phone offers an action that takes a picture, which his Action Button runs.",
    },
    {
      statement: "A picture taken by that action reaches Alan's handler.",
    },
    {
      statement: "Each editor panel opens by Ctrl+Alt and the first letter of that panel's name.",
    },
    {
      statement: "A colored row takes that color on its name and nowhere else.",
    },
    {
      statement:
        "A row whose children carry colors counts those children by color, after the whole count.",
    },
    {
      statement: "A count for a color carries that color rather than a label naming it.",
    },
  ],

  constraints: [
    "This initiative stays when its last intent goes, rather than dying as a finished initiative does.",
  ],
} as const satisfies Initiative
