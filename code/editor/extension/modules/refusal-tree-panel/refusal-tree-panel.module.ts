import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const refusalTreePanel = {
  id: "01a0d94c-a29e-747a-aa66-930acb52be70",
  type: "page-type/module",
  slug: "refusal-tree-panel",
  definition: "the Refusals panel brought up, and the refusals drawn into it from a file",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The refusals are read from the file the inbox tracking poll writes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The panel draws the rows that file has before any change to the file arrives.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The panel draws again when that file is written and at no other time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file written while the panel is hidden is kept rather than drawn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A panel becoming visible with a drawing owed draws the rows the file last had.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The panel counts the refusals it holds rather than the rows it holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal on a page the nesting never reached is named on the channel.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No row here is deleted from the panel.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here composes the tree.",
    },
  ],
} as const satisfies Module
