import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const buildDirectory = {
  id: "01a08db3-6723-70df-8ccd-9abb25c56c16",
  type: "page-type/module",
  slug: "build-directory",
  definition: "the folder a website is built into",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A build told no folder writes into the folder the pod serves.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build told a folder writes into that folder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder named as nothing but blanks is no folder.",
    },
  ],
  createdAt: "2026-09-10T23:42:19.939Z",
  updatedAt: "2026-10-30T16:17:15.345Z",
} as const satisfies Module
