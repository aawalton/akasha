import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const usePage = {
  id: "01a0610c-4306-753f-9ca1-222dd831d0f6",
  type: "page-type/module",
  slug: "use-page",
  definition: "one page read live by its id",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page is asked for by its id rather than found in a listing of its page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page is read however many pages its page type holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page is read again each time it is pushed as changed.",
    },
  ],
} as const satisfies Module
