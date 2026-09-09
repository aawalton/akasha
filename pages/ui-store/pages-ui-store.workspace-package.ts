import type { WorkspacePackage } from "@akasha/code/workspace-package"

export const pagesUiStore = {
  id: "01a05b69-455c-7bbd-8f3b-b2c3946559fc",
  pageTypeSlug: "workspace-package",
  type: "workspace-package",
  slug: "pages-ui-store",
  definition: "the page rows a browser holds, and the queries and writes run against them",
  manifest: "json",
  parts: [
    "domain/pages-ui-store-collection",
    "module/diagnostics",
    "domain/pages-ui-store-optimistic",
    "domain/pages-ui-store-query",
    "domain/pages-ui-store-realtime",
    "module/report-stall",
    "module/singleton",
    "domain/pages-ui-store-sql",
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
} as const satisfies WorkspacePackage
