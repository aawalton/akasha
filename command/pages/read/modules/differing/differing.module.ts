import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const differing = {
  id: "01a04ebb-d762-7000-92c3-765835d1b7a3",
  type: "module",
  slug: "differing",
  definition:
    "the body an object id names, and what moved between it and the body that is there now",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A body is found again by the object id git holds that body under and by nothing else.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An object id git does not hold is no body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing is put in its place.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A difference is git's own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A difference has one line either side of the lines that moved.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Both bodies a difference is taken between are written out first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Whatever goes wrong is no difference rather than a difference that might be wrong.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The files a difference was taken over are gone before the difference is answered.",
    },
  ],
} as const satisfies Module
