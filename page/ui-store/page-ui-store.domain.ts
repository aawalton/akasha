import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const pageUiStore = {
  id: "01a05b69-455c-7bbd-8f3b-b2c3946559fc",
  type: "domain",
  slug: "page-ui-store",
  definition: "the page rows a browser holds, and the queries and writes run against them",

  parts: [
    "domain/page-ui-store-collection",
    "domain/page-ui-store-optimistic",
    "domain/page-ui-store-query",
    "domain/page-ui-store-realtime",
    "domain/page-ui-store-sql",
    "module/diagnostics",
    "module/report-stall",
    "module/singleton",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A write is shown before the write lands.",
    },
    {
      invariantKind: "departure",
      statement: "A write is settled once the write lands.",
    },
    {
      invariantKind: "departure",
      statement: "A query is answered from the rows the browser already has.",
    },
    {
      invariantKind: "departure",
      statement: "A page type kept in files is read over HTTP rather than subscribed to.",
    },
    {
      invariantKind: "stopgap",
      statement: "This package reaches the old page store rather than the store akasha holds.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing here is proved by a test of its own.",
    },
  ],
} as const satisfies Domain
