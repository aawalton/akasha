import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const leadsLocationTypes = {
  id: "01a06274-b08a-7440-bf39-413f96f30c01",
  type: "page-type/module",
  slug: "leads-location-types",
  definition: "the kinds of place a lead is found in, and the wording for each",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This module is written by `akasha temper upstream data-port lead-list`.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No string of this module is written by hand.",
    },
  ],
  createdAt: "2026-09-02T14:10:09.674Z",
  updatedAt: "2026-10-28T17:04:56.204Z",
} as const satisfies Module
