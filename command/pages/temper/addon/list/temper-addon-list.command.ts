import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperAddonList = {
  id: "01a0603c-c1ca-7749-a8e8-ffbbcbf15e84",
  type: "page-type/command",
  slug: "temper-addon-list",
  definition: "the command naming every folder of addon code the checkout has",
  code: "ts",
  test: "ts",

  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The flat layout and the nested layout are discovered alike.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The roster is read from the checkout.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A checkout holding no addon is refused rather than reported empty.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each addon is named beside the folder that addon was found in.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the game folder.",
    },
  ],
  name: "list",
  arguments: [{ argument: "argument/json" }, { argument: "argument/code-root" }],
  createdAt: "2026-09-02T03:49:49.642Z",
  updatedAt: "2026-10-30T16:18:42.068Z",
} as const satisfies Command
