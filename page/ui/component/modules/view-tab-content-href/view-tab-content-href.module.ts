import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const viewTabContentHref = {
  id: "01a05cba-9cbb-7235-9232-307020453762",
  type: "page-type/module",
  slug: "view-tab-content-href",
  definition: "the address a row in a view tab links to",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A row links to its page under the row's own page type rather than the view's.",
    },
  ],
  createdAt: "2026-09-01T11:28:48.827Z",
  updatedAt: "2026-10-30T14:13:21.571Z",
} as const satisfies Module
