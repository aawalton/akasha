import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperEsoGenerateReturns = {
  id: "01a0d3c8-0151-7c39-8927-103cdb98713e",
  type: "page-type/command",
  slug: "temper-eso-generate-returns",
  definition: "the command writing every function's return kinds out of the game's documentation",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The documentation read is the `~/esoui` clone's `ESOUIDocumentation.txt`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A clone this workstation does not carry refuses the call.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The table is written whole rather than mended entry by entry.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run finding the table already as it should be lands nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run that should have landed and landed nothing refuses rather than answering.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A documentation naming no function refuses rather than emptying the table.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer says the API version the kinds were read at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer says how many functions were written and how many give back nothing.",
    },
  ],
  name: "returns",
  arguments: [{ argument: "argument/code-root" }],
} as const satisfies Command
