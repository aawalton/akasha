import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const usePagesFilteredQuery = {
  id: "01a06205-4f3c-7009-9a49-b56f7fa2267f",
  type: "page-type/module",
  slug: "use-pages-filtered-query",
  definition: "The filtered, sorted, paged query behind a listing of pages.",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A listing is named by its page type's title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type stating no title is named by its plural, and then by its own slug.",
    },
  ],
} as const satisfies Module
