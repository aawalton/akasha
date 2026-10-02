import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageReaderContent = {
  id: "01a06205-4f3c-700b-a569-c171ba916254",
  type: "page-type/module",
  slug: "page-reader-content",
  definition: "The reader shown for a page: its prose, its progress and its source.",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The pager under the prose is drawn once the prose is in, never above where it lands.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Opening a page never moves its progress, and only the reader's own scroll does.",
    },
  ],
} as const satisfies Module
