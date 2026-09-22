import type { IosComponent } from "akasha/code/ios-component/ios-component.page-type.types.ts"

export const timelineChecks = {
  id: "01a08c75-6675-73c2-b0e1-37744996eaaf",
  type: "page-type/ios-component",
  slug: "timeline-checks",
  definition: "what both harnesses assert of the entries making up a feed's timeline",
  swift: "swift",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Both apps run these same assertions rather than each carrying its own copy.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A harness is handed the name and whether the check held and the reading the check saw.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The rule asserted is the one the provider calls rather than a copy of it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A feed stating its own moment and a feed stating none are both asserted.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "The provider's own timeline is compiled here and never run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The cost feed asked is the app's own rather than one written again here.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A harness that names no cost widget has no cost feed for these to reach.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a clock.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Every moment is spelled out.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "This component is compiled by the harnesses rather than by either app.",
    },
  ],
} as const satisfies IosComponent
