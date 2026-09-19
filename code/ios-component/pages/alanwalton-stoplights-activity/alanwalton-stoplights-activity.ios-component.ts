import type { IosComponent } from "akasha/code/ios-component/ios-component.page-type.types.ts"

export const alanwaltonStoplightsActivity = {
  id: "01a0ba5e-225c-7d6e-9341-9294f7f129b2",
  type: "page-type/ios-component",
  slug: "alanwalton-stoplights-activity",
  definition: "all thirteen stoplights drawn as one live activity",
  swift: "swift",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every stoplight the three tiles draw is drawn here at once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The lock screen keeps the groups apart, a row to each.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The island draws the thirteen in one run, since a group name costs width.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A gap wider than the one between rings is where a group ends and the next opens.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The one mark a compact island has room for is the worst color reached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The figure beside it is how many stoplights are short of green.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here asks the server for a reading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What the lock screen shows is what was last handed to the activity.",
    },
  ],
} as const satisfies IosComponent
