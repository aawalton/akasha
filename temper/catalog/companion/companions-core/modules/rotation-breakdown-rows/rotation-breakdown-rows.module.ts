import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const rotationBreakdownRows = {
  id: "01a06110-abe5-7eeb-859b-48fffcfee56d",
  type: "page-type/module",
  slug: "rotation-breakdown-rows",
  definition: "the rows a companion rotation is broken down into when it is explained",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each row's names are read from its rotation breakdown row page.",
    },
  ],
  createdAt: "2026-09-02T07:41:17.669Z",
  updatedAt: "2026-09-26T20:14:29.000Z",
} as const satisfies Module
