import type { IosComponent } from "akasha/code/ios-component/ios-component.page-type.types.ts"

export const timelineChecks = {
  id: "01a08c75-6675-73c2-b0e1-37744996eaaf",
  type: "page-type/ios-component",
  slug: "timeline-checks",
  definition: "what both harnesses assert of the entries a feed's timeline is made of",
  swift: "swift",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Both apps run these same assertions rather than each carrying its own copy.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A harness is handed the name and whether the check held and the reading the check saw.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The rule asserted is the one the provider calls rather than a copy of it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A feed stating its own moment and a feed stating none are both asserted.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "The provider's own timeline is compiled here and never run.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The cost feed asked is the app's own rather than one written again here.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A harness that names no cost widget has no cost feed for these to reach.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a clock.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Every moment is spelled out.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "This component is compiled by the harnesses rather than by either app.",
    },
  ],
} as const satisfies IosComponent
