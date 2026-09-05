import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const pagesUiStore = {
  id: "01a05b69-455c-7bbd-8f3b-b2c3946559fc",
  pageTypeSlug: "workspace-package",
  slug: "pages-ui-store",
  definition: "the page rows a browser holds, and the queries and writes run against them",
  manifest: "json",
  partSlugs: [
    "module/acquire",
    "module/content-persistence",
    "module/fetch-attach",
    "module/file-backing",
    "module/identity-change",
    "module/page-row",
    "module/pages-collection",
    "module/persistence",
    "module/shape-descriptor",
    "module/store",
    "module/sync-controller",
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
      statement: "A write is shown before it lands and settled once it does.",
    },
    {
      invariantKind: "departure",
      statement: "A query is answered from the rows the browser already holds.",
    },
    {
      invariantKind: "departure",
      statement: "A page type kept in files is read over HTTP rather than subscribed to.",
    },
    {
      invariantKind: "stopgap",
      statement: "This package reaches the old page store rather than the one akasha holds.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing here is proved by a test of its own.",
    },
  ],
} as const satisfies WorkspacePackage
