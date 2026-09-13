import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const amyHarnessImprovements = {
  id: "01a0923f-7f1e-7a24-8ed4-0f22b6840e04",
  type: "initiative",
  slug: "amy-harness-improvements",
  domain: "domain/alan-harness",
  persona: "amy",
  intents: [
    {
      statement: "Every panel in the editor extension has one top-level row.",
    },
    {
      statement: "A panel's top-level row is always expanded rather than collapsible.",
    },
    {
      statement: "alanwalton.com has no nav item other than Tasks and Temper Tasks.",
    },
    {
      statement: "alanwalton.com has no view other than the views of Tasks and Temper Tasks.",
    },
    {
      statement: "Temper Tasks has no All view.",
    },
    {
      statement: "A subagent is stopped from the agents panel, as a seat is.",
    },
  ],

  constraints: [
    "This initiative stays when its last intent goes, rather than dying as a finished initiative does.",
  ],
} as const satisfies Initiative
