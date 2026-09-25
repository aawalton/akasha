import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const claudeUsage = {
  id: "01a072ae-4955-71e6-bf45-d5a4c5a59670",
  type: "page-type/route",
  slug: "claude-usage",
  definition: "what the Claude fleet has spent of its two windows",
  code: "ts",
  test: "ts",
  urlPath: "api/claude-usage",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The group whose words and colors are read is the one whose page names this route.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The tier is read against the scale of the reading the group's colored readout takes its color from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No window about to end is the top rung of that scale.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A color the shipped widget cannot decode is answered as red.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A scale that went unread refuses rather than guessing a tier.",
    },
  ],
} as const satisfies Route
