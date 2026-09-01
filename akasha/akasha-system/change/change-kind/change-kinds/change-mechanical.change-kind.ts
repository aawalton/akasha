import type { ChangeKind } from "../change-kind.page-type.ts"

export const changeMechanical = {
  id: "01a05df1-e262-72e3-8f24-d6e5e4ed122d",
  pageTypeSlug: "change-kind",
  slug: "change-mechanical",
  definition: "a change an akasha command composes",
  runsChecks: true,
  runsWarrants: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A change made by an akasha command stating `mechanical` true is mechanical.",
    },
    {
      invariantKind: "departure",
      statement: "An agent runs a mechanical change.",
    },
    {
      invariantKind: "departure",
      statement: "A mechanical command takes no body an agent composed.",
    },
    {
      invariantKind: "stopgap",
      statement: "No code reads the `mechanical` a command states.",
    },
    {
      invariantKind: "gap",
      statement: "A command that changes anything states whether it is mechanical.",
    },
  ],
} as const satisfies ChangeKind
