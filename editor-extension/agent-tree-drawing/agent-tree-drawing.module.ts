import type { Module } from "../../code-system/modules/module.page-type.ts"

export const agentTreeDrawing = {
  id: "01a0686b-bfe9-706d-8295-b8bf933d18de",
  pageTypeSlug: "module",
  type: "module",
  slug: "agent-tree-drawing",
  definition:
    "how a row of the agent tree draws, what it opens, and the colour a decoration gives it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A row with no children is drawn as a leaf.",
    },
    {
      invariantKind: "departure",
      statement: "A row is drawn expanded while a filter narrows the tree and collapsed otherwise.",
    },
    {
      invariantKind: "departure",
      statement: "A filtered row takes an id of its own so the editor draws that row again.",
    },
    {
      invariantKind: "departure",
      statement: "A row with children is badged with the count of children that row has.",
    },
    {
      invariantKind: "departure",
      statement: "The last line of a tooltip is the page akasha has for the row.",
    },
    {
      invariantKind: "departure",
      statement: "A row akasha has no page for says so rather than leaving the line out.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent's tooltip names the subagent and its page and nothing else.",
    },
    {
      invariantKind: "departure",
      statement: "A seat's row has the context value its menus are keyed on.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent's row has `subagent` as its context value.",
    },
    {
      invariantKind: "departure",
      statement: "A click on a seat brings the terminal that seat is working in forward.",
    },
    {
      invariantKind: "departure",
      statement: "A click on a subagent opens the page akasha has for that subagent.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent akasha has no page for answers no click.",
    },
    {
      invariantKind: "departure",
      statement: "A stopped seat or a subagent or a turn colour takes its own decoration.",
    },
    {
      invariantKind: "departure",
      statement: "A tree under no filter counts no matches rather than counting every row.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the fleet.",
    },
  ],
} as const satisfies Module
