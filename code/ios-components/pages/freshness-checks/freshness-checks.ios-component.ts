import type { IosComponent } from "akasha/code/ios-components/ios-component.page-type.types.ts"

export const freshnessChecks = {
  id: "01a09b4a-75dd-790c-a399-1972b3b8e424",
  type: "ios-component",
  slug: "freshness-checks",
  definition: "what both harnesses assert of the age and the count the freshness tile works out",
  swift: "swift",
  invariants: [
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
      invariantKind: "departure",
      statement: "The rule asserted is the one the provider calls rather than a copy of it.",
    },
    {
      invariantKind: "departure",
      statement: "A feed left behind by a tile taken off the phone is asserted to be left out.",
    },
    {
      invariantKind: "gap",
      statement: "The provider's own timeline is compiled here and never run.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a clock.",
    },
    {
      invariantKind: "absence",
      statement: "Every moment is spelled out.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the store the phone keeps.",
    },
    {
      invariantKind: "absence",
      statement: "This component is compiled by the harnesses rather than by either app.",
    },
  ],
} as const satisfies IosComponent
