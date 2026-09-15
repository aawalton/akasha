import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperInventoryKnowledge = {
  id: "01a0603c-c1d4-7896-b651-fa71ab764327",
  type: "page-type/command",
  slug: "temper-inventory-knowledge",
  definition: "the command giving back what each character knows of recipes, motifs and scripts",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An item key is `recipe:<resultItemId>`, `motif:<styleId>:<chapterId>` or `script:<scriptId>`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A motif key's chapter is a whole number or the word `master`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Naming an item key turns the answer into who knows that item.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key naming no kind this command has refuses the call.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A character the capture does not hold refuses the call.",
    },
  ],
  name: "knowledge",
  arguments: [
    { argument: "argument/json" },
    { argument: "argument/characters-path" },
    { argument: "argument/char" },
    { argument: "argument/item-key" },
  ],
} as const satisfies Command
