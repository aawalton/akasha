import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const orphanRefusing = {
  id: "01a0f21a-af59-74bb-a20e-641454892fc4",
  type: "page-type/module",
  slug: "orphan-refusing",
  definition: "whether a file a change would begin sits beside a page that is not there",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A file beside a page is a file whose name states a property after the page's name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A file beside a page that is not there is an orphan, and the refusal names that page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path that already holds a body is no orphan.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path naming no page beside it is no orphan.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A refusal says where the page is now, where the index shows a page of its id or slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page the change moved is found by the id the files beneath the change hold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page whose type changed is looked for among pages of its slug carrying the file's property.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every such page is named where more than one is found.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads what a body says beyond the id a page states.",
    },
  ],
} as const satisfies Module
