import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const usePagesFilteredQuery = {
  id: "01a06205-4f3c-7009-9a49-b56f7fa2267f",
  type: "page-type/module",
  slug: "use-pages-filtered-query",
  definition: "The filtered, sorted, paged query behind a listing of pages.",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A listing is named by its page type's title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type stating no title is named by its plural, and then by its own slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type not yet read is named by the slug the listing asked for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A listing config handed in is read rather than the one the page type states.",
    },
  ],
  createdAt: "2026-09-02T12:08:30.268Z",
  updatedAt: "2026-09-27T12:34:51.000Z",
} as const satisfies Module
