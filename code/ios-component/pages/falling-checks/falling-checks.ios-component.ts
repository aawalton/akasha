import type { IosComponent } from "akasha/code/ios-component/ios-component.page-type.types.ts"

export const fallingChecks = {
  id: "01a08c54-a75a-7c9b-b63f-c642ff505fb5",
  type: "page-type/ios-component",
  slug: "falling-checks",
  definition: "what both harnesses assert of a reading that falls and a caption that counts",
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
      statement: "The assertions here reach only the structs both apps share.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The scales and answers the placing is held to are the server's own test's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every case the server's test states of placing a reading is stated here too.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A harness keeps for itself the assertions on the stoplight struct that harness declares.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here counts a failure or names a check that passed.",
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
