import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const worldTreePanel = {
  id: "01a0de0e-7197-73d1-83c0-8336a84f644f",
  type: "page-type/module",
  slug: "world-tree-panel",
  definition: "the Worlds panel brought up, and the worlds drawn into it from a file",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The worlds are read from the file a landing draws and drawn unchanged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The panel draws again when that file is written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row's page opens in the browser, as a seat's page opens from the agents panel.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story under no world is named on the channel rather than said to Alan.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The panel has no refresh, since the file is followed.",
    },
  ],
} as const satisfies Module
