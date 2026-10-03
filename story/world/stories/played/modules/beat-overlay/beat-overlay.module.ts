import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const beatOverlay = {
  id: "01a10390-5892-7717-b2a7-d5037a34ce46",
  type: "page-type/module",
  slug: "beat-overlay",
  definition: "the values a reader's panels hold as of the beat the reader is on",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A row is overlaid by the page it answers to, named by its type and its slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page made in a later beat is drawn nowhere before that beat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key the beats do not change is the value the page already holds.",
    },
  ],
} as const satisfies Module
