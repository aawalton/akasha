import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const usePage = {
  id: "01a0610c-4306-753f-9ca1-222dd831d0f6",
  type: "page-type/module",
  slug: "use-page",
  definition: "a page read live with its content tier attached",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A content tier is read again each time its page is pushed as changed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A content tier is read again on a timer only while no stream follows its page.",
    },
  ],
} as const satisfies Module
