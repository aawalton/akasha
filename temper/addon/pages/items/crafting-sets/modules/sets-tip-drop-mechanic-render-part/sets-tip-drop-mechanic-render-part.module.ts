import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsTipDropMechanicRenderPart = {
  id: "01a06231-8f1e-7196-8b24-736224602b2a",
  type: "page-type/module",
  slug: "sets-tip-drop-mechanic-render-part",
  definition: "the one-zone piece of drop text with its mechanics and boss names in brackets",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "Which pieces appear follows the tooltip settings unless the text is not for a tooltip.",
    },
    { decisionKind: "decision-kind/departure", statement: "The zone name is tinted grey." },
  ],
  createdAt: "2026-09-02T12:56:50.206Z",
  updatedAt: "2026-09-22T03:24:53.000Z",
} as const satisfies Module
