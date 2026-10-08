import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsDataRegisterData = {
  id: "01a061fc-cee8-7e0a-a57e-257c1300fc25",
  type: "page-type/module",
  slug: "sets-data-register-data",
  definition: "the set tables placed onto the library table",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The set tables placed are the ones worked out from the set pages.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No set is held back as newer than the live game, since the pages follow it.",
    },
  ],
  createdAt: "2026-09-02T11:59:13.128Z",
  updatedAt: "2026-09-26T13:59:27.000Z",
} as const satisfies Module
