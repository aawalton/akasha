import type { IosComponent } from "akasha/code-system/ios-components/ios-component.page-type.types.ts"

export const scaleChecks = {
  id: "01a08c63-252c-77f1-b8be-c0d4bca74aaa",
  pageTypeSlug: "ios-component",
  type: "ios-component",
  slug: "scale-checks",
  definition: "what holds the phone's placing of a reading among rungs to the server's",
  swift: "swift",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The scales asserted against are the ones the server's own test names.",
    },
    {
      invariantKind: "departure",
      statement: "Every answer asserted is the answer the server's own test states.",
    },
    {
      invariantKind: "departure",
      statement: "A case added to the server's test belongs here too.",
    },
    {
      invariantKind: "departure",
      statement: "Both apps run these same assertions rather than each carrying its own copy.",
    },
    {
      invariantKind: "departure",
      statement:
        "A harness is handed the name and whether the check held and the reading the check saw.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing but this file catches the two placings drifting apart.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a clock or a feed or a store.",
    },
    {
      invariantKind: "absence",
      statement: "This component is compiled by the harnesses rather than by either app.",
    },
  ],
} as const satisfies IosComponent
