import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const catalogSideFile = {
  id: "01a060ce-b8cb-776b-b2b7-0589a741c9c4",
  type: "page-type/module",
  slug: "catalog-side-file",
  definition: "the request the catalog addon reads, taken out of Lua and written back as Lua",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The file may record the last game version and item id whose mined items landed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A new request keeps the upload record the file had.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The file may record, per catalog, the version and invalidation it landed for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A catalog landed again replaces its own record and leaves the others.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A new request or upload record keeps the landed catalogs the file had.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file the addon's table cannot be read out of reads as no request.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file setting the addon's table to nil reads as no request.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A request names each domain once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The domains a request names are written in alphabetical order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A request naming no domain asks the addon to collect every domain again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A written request has a version above the version the last request had.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A written request has a version at least as high as the clock reads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A written request opens with a line saying no hand edits the file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An empty Lua table read where a domain list was asked for reads as an empty list.",
    },
  ],
  createdAt: "2026-09-02T06:29:15.595Z",
  updatedAt: "2026-10-19T17:50:52.469Z",
} as const satisfies Module
