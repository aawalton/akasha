import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const contentPagesCacheCore = {
  id: "01a0655d-daa6-7fdf-b1e7-5b58892ba09c",
  type: "page-type/module",
  slug: "content-pages-cache-core",
  definition: "the shape of a held index of content pages",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A writer keeping a page here holds only the keys that writer asked the store for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`id` is the one key a held page must have.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No held page is kept from eviction.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "An index a phone wrote with pins reads back with those pins dropped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every other page key is optional here and judged only where a held page has that key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key this module names nothing about is handed back to the reader unchanged.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No key that no writer in the repository produces is required of a held page.",
    },
  ],
} as const satisfies Module
