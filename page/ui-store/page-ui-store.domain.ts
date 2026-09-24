import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const pageUiStore = {
  id: "01a05b69-455c-7bbd-8f3b-b2c3946559fc",
  type: "page-type/domain",
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
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A write is shown before the write lands.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A write is settled once the write lands.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A query is answered from the rows the browser already has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type kept in files is read over HTTP.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a browser holds is read again when a change to it is pushed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a browser holds is read again on a timer only while no stream follows it.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "This package reaches the old page store rather than the store akasha holds.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "Nothing here is proved by a test of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type written outside the store is read again on being asked to.",
    },
  ],
} as const satisfies Domain
