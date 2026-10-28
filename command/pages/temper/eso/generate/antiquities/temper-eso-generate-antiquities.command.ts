import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperEsoGenerateAntiquities = {
  id: "01a1836d-83aa-7f0e-90c9-b1d6fa565801",
  type: "page-type/command",
  slug: "temper-eso-generate-antiquities",
  definition: "the command adding each antiquity the game's capture names to its category's rows",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The antiquities are read from the capture beside their catalog domain page.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The antiquities come from a running game, so no checkout alone can write them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An antiquity no category row states is added to the rows of its category.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An antiquity whose category has no page is named rather than added.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row already stated is left as it is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run finding every antiquity already stated lands nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No capture landed refuses rather than answering.",
    },
  ],
  name: "antiquities",
  arguments: [{ argument: "argument/code-root" }],
  createdAt: "2026-10-28T16:52:34.857Z",
  updatedAt: "2026-10-28T16:52:34.857Z",
} as const satisfies Command
