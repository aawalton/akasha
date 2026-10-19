import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperEsoGenerateItemSets = {
  id: "01a0d8c6-4440-786b-95a7-90a22c558735",
  type: "page-type/command",
  slug: "temper-eso-generate-item-sets",
  definition: "the command writing each set's collection pieces out of the game's own capture",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The sets and type constants are read from the captures beside their domain pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A domain with no capture landed refuses, naming that domain.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The values come from a running game, so no checkout alone can write them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A capture with no piece naming an item id refuses rather than emptying a page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run finding every page already as the capture says lands nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer names every set the capture holds and no page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer names every set page the capture holds no collection for.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here asks the game to collect again.",
    },
  ],
  name: "item-sets",
  arguments: [{ argument: "argument/code-root" }],
  createdAt: "2026-09-25T13:34:27.392Z",
  updatedAt: "2026-10-19T17:44:57.193Z",
} as const satisfies Command
