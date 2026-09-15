import type { IosComponent } from "akasha/code/ios-component/ios-component.page-type.types.ts"

export const fallingChecks = {
  id: "01a08c54-a75a-7c9b-b63f-c642ff505fb5",
  type: "ios-component",
  slug: "falling-checks",
  definition: "what both harnesses assert of a reading that falls and a caption that counts",
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
      statement: "The assertions here reach only the structs both apps share.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The scales and answers the placing is held to are the server's own test's.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every case the server's test states of placing a reading is stated here too.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A harness keeps for itself the assertions on the stoplight struct that harness declares.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here counts a failure or names a check that passed.",
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
