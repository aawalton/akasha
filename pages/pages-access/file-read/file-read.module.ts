import type { Module } from "@akasha/code-system/module"

export const fileRead = {
  id: "01a05bd6-c530-7caa-8cc1-55059f494d6f",
  pageTypeSlug: "module",
  slug: "file-read",
  definition: "file-backed pages read from the tree",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The pages of one page type are asked of `@akasha/pages-system-service`.",
    },
    {
      invariantKind: "departure",
      statement: "A narrow the pages run is sent as a test.",
    },
    {
      invariantKind: "departure",
      statement: "Every narrow is run again over the rows the answer carries.",
    },
    {
      invariantKind: "departure",
      statement: "A row the pages answer carries the page's values and no path.",
    },
    {
      invariantKind: "departure",
      statement: "A page's id and slug are read off the values that page carries.",
    },
    {
      invariantKind: "departure",
      statement: "Rows are ordered here rather than by the pages.",
    },
    {
      invariantKind: "departure",
      statement: "A cursor marks where a listing left off in that order.",
    },
    {
      invariantKind: "departure",
      statement: "A run held for a cursor is dropped once that run has been idle a minute.",
    },
    {
      invariantKind: "departure",
      statement: "A held run is dropped once the rows held reach two hundred thousand.",
    },
    {
      invariantKind: "departure",
      statement:
        "A question the pages refuse is raised rather than read as a page type holding no page.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which page types are backed by files is the page types `@akasha/pages-system-service` lists.",
    },
    {
      invariantKind: "departure",
      statement: "That roster is asked once and held for a minute rather than per page read.",
    },
    {
      invariantKind: "departure",
      statement:
        "A roster holding no page type refuses rather than reading as no page being a file.",
    },
  ],
} as const satisfies Module
