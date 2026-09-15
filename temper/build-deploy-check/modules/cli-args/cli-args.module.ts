import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const cliArgs = {
  id: "01a06287-7841-7a70-bbb2-973c9c17ce4e",
  type: "module",
  slug: "cli-args",
  definition: "the flags and positionals read off a command line against a declared shape",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A flag the shape does not declare is refused rather than admitted.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A refused flag close in spelling to a declared flag is answered with the declared flag named.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A flag declared boolean takes no value.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A flag declared required and left unsaid refuses the whole line.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A flag name is said on the line in kebab case and read back in camel case.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A line naming no single file, or no line this shape reads, is one file of none.",
    },
  ],
} as const satisfies Module
