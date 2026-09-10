import type { IosComponent } from "../../ios-component.page-type.types.ts"

export const fallingChecks = {
  id: "01a08c54-a75a-7c9b-b63f-c642ff505fb5",
  pageTypeSlug: "ios-component",
  type: "ios-component",
  slug: "falling-checks",
  definition: "what both harnesses assert of a reading that falls and a caption that counts",
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
      statement: "The assertions here reach only the structs both apps share.",
    },
    {
      invariantKind: "departure",
      statement: "A harness keeps for itself the assertions on the stoplight struct it declares.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here counts a failure or names a passing one.",
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
