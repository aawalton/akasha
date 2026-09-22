import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const indexBuilding = {
  id: "01a0a120-e0b6-7e06-a347-7282763bf802",
  type: "page-type/module",
  slug: "index-building",
  definition: "the index built for a checkout by running a file",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The index is built by running this file rather than by calling a command.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The checkout the index is built for is the first word on the command line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call naming no checkout builds the index for the checkout this file sits in.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No root named in the environment moves the build off that checkout.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The whole index is built rather than the part git does not carry.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A build that could not finish says why in one line and leaves a code that is not zero.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing of the index itself is printed.",
    },
  ],
} as const satisfies Module
