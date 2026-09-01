import type { Module } from "@akasha/code-system/module"

export const filePageTypeConfig = {
  id: "01a05bd6-c52f-7e97-a8ea-067913e34725",
  pageTypeSlug: "module",
  slug: "file-page-type-config",
  definition: "what a file-backed page type states about how its pages are shown",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "What a page type states under a key is asked of `@akasha/pages-system-service` by that page type's slug.",
    },
    {
      invariantKind: "departure",
      statement: "A key is spelled as the property page's key rather than as the property's slug.",
    },
    {
      invariantKind: "departure",
      statement: "A key a page type states nothing under is asked of the page type above.",
    },
    {
      invariantKind: "departure",
      statement: "Twenty page types up the descent is as far as a key is followed.",
    },
    {
      invariantKind: "departure",
      statement: "A page type already asked is not asked again.",
    },
    {
      invariantKind: "departure",
      statement:
        "A question the pages refuse is raised rather than read as a page type stating no value.",
    },
    {
      invariantKind: "departure",
      statement: "A key a page type declares no property for is refused by the pages.",
    },
    {
      invariantKind: "gap",
      statement: "The `page-type` page type declares neither `sequence` nor `mediaConfig`.",
    },
    {
      invariantKind: "absence",
      statement: "No answer here is held for a later question.",
    },
  ],
} as const satisfies Module
