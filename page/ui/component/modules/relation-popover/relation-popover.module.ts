import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const relationPopover = {
  id: "01a0617e-0d2d-7007-9b42-5b4f872dbcc8",
  type: "page-type/module",
  slug: "relation-popover",
  definition: "the popover picking a relation property's pages",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page the relation already names is kept out of the candidates by its id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A relation is taken away by the value the page carries rather than by an id.",
    },
  ],
  createdAt: "2026-09-02T09:40:45.997Z",
  updatedAt: "2026-09-22T14:08:59.000Z",
} as const satisfies Module
