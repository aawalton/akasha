import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const catalogPublicApi = {
  id: "01a063ba-94e5-75b2-87c7-9dffc0a06b28",
  type: "page-type/module",
  slug: "catalog-public-api",
  definition: "the global opening the collected catalog table to another add-on",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The global is named for the addon.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The global has the one reader and nothing more.",
    },
  ],
  createdAt: "2026-09-02T20:06:07.333Z",
  updatedAt: "2026-09-22T13:56:42.000Z",
} as const satisfies Module
