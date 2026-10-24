import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageDetailLoading = {
  id: "01a0655e-d39b-7b16-9974-8d43261a1726",
  type: "page-type/module",
  slug: "page-detail-loading",
  definition: "what a page's detail route loads before it is drawn",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every read the loader makes is held to what its reader may read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page its reader may not read is answered as no such page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page carries the icon its page type gives it beside the icon it is drawn with.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key is asked of a page type only where that page type declares the key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page with no title is named by its slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A story played carries the reads its first drawing makes, answered as its reader's own reads are.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A read that goes unanswered here is left for the browser to make.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story drawn with character covers carries its latest turn and its characters.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The covers those characters are drawn with are named for the page to fetch early.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page in a sequence or a story read says its loader reads beyond the page itself.",
    },
  ],
  createdAt: "2026-09-03T03:45:08.507Z",
  updatedAt: "2026-10-24T17:31:22.362Z",
} as const satisfies Module
