import type { IosComponent } from "../../ios-component.page-type.types.ts"

export const timelineChecks = {
  id: "01a08c75-6675-73c2-b0e1-37744996eaaf",
  pageTypeSlug: "ios-component",
  type: "ios-component",
  slug: "timeline-checks",
  definition: "what both harnesses assert of the entries a feed's timeline is made of",
  swift: "swift",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Both apps run these same assertions rather than each carrying its own copy.",
    },
    {
      invariantKind: "departure",
      statement: "A harness is handed the name, whether it held, and what it saw.",
    },
    {
      invariantKind: "departure",
      statement: "The rule asserted is the one the provider calls rather than a copy of it.",
    },
    {
      invariantKind: "departure",
      statement: "A feed stating its own moment and a feed stating none are both asserted.",
    },
    {
      invariantKind: "gap",
      statement:
        "The provider's own timeline is compiled here and never run, its context being WidgetKit's to make.",
    },
    {
      invariantKind: "departure",
      statement:
        "The cost feed's own conformance stands here again, no harness compiling a widget.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing catches that copy and the real conformance saying different things.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a clock, every moment being spelled out.",
    },
    {
      invariantKind: "absence",
      statement: "This component is compiled by the harnesses rather than by either app.",
    },
  ],
} as const satisfies IosComponent
