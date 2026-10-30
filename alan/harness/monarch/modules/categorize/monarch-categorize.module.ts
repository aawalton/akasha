import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const monarchCategorize = {
  id: "01a06865-ecc3-728c-8068-f1a0461fa6d7",
  type: "page-type/module",
  slug: "monarch-categorize",
  definition: "how code writes a Monarch category on a Monarch transaction in Monarch and akasha",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A category Monarch takes and reports nothing back for is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A category is named by a page that exists.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A Monarch id resolving other than exactly one page is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A transaction no month sidecar carries is refused rather than written to Monarch alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The rule that decided is recorded beside the category rather than left to be inferred.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The row is tagged as machine-touched when its category is set.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Monarch taking a category while no month file moves is refused.",
    },
  ],
  createdAt: "2026-09-03T17:51:45.347Z",
  updatedAt: "2026-10-30T15:34:26.165Z",
} as const satisfies Module
