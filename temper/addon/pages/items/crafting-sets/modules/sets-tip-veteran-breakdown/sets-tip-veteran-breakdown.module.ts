import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsTipVeteranBreakdown = {
  id: "01a06231-8f1e-737c-a36f-8ed525388bae",
  type: "page-type/module",
  slug: "sets-tip-veteran-breakdown",
  definition: "the per-slot veteran or normal reading of a monster set whose pieces differ",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The breakdown only appears when the pieces do not all agree.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slot with no veteran flag recorded is shown as a question mark.",
    },
  ],
  createdAt: "2026-09-02T12:56:50.206Z",
  updatedAt: "2026-09-22T03:24:53.000Z",
} as const satisfies Module
