import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const asRecord = {
  id: "01a05c94-2bfb-7908-974d-2bd990ac9a56",
  type: "page-type/module",
  slug: "as-record",
  definition: "a value narrowed to a record of unknown values, or nothing where it is not one",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A list is no record.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing at all is no record.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reader wanting a record either way reads an empty record here.",
    },
  ],
  createdAt: "2026-09-01T10:46:49.595Z",
  updatedAt: "2026-09-22T13:24:12.000Z",
} as const satisfies Module
