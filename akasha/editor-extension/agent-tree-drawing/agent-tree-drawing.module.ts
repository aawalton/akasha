import type { Module } from "../../code-system/modules/module.page-type.ts"

export const agentTreeDrawing = {
  id: "01a0686b-bfe9-706d-8295-b8bf933d18de",
  pageTypeSlug: "module",
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
      statement: "A filtered row takes an id of its own so the editor draws it again.",
    },
    {
      invariantKind: "departure",
      statement: "A row carrying children is badged with how many it carries.",
    },
    {
      invariantKind: "departure",
      statement: "The last line of a tooltip is the page akasha holds for the row.",
    },
    {
      invariantKind: "departure",
      statement: "A row akasha holds no page for says so rather than leaving the line out.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent's tooltip names the subagent and its page and nothing else.",
    },
    {
      invariantKind: "departure",
      statement: "A seat's row carries the context value its menus are keyed on.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent's row carries `subagent` as its context value.",
    },
    {
      invariantKind: "departure",
      statement: "A click on a seat brings the terminal that seat is working in forward.",
    },
    {
      invariantKind: "departure",
      statement: "A click on a subagent opens the page akasha holds for it.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent akasha holds no page for answers no click.",
    },
    {
      invariantKind: "departure",
      statement: "A stopped seat, a subagent and a turn colour each take their own decoration.",
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
