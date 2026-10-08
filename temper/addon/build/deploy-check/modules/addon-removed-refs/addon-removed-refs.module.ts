import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const addonRemovedRefs = {
  id: "01a06365-e827-7004-83d6-2a85f1a30c02",
  type: "page-type/module",
  slug: "addon-removed-refs",
  definition: "the references an emitted bundle keeps to a third-party add-on that is gone",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A reference inside a string literal is masked before the line is scanned.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Every finding names the add-on the global belonged to and the remedy.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A global is matched whole rather than as part of a longer name.",
    },
  ],
  createdAt: "2026-09-02T18:33:38.087Z",
  updatedAt: "2026-09-21T22:03:34.000Z",
} as const satisfies Module
