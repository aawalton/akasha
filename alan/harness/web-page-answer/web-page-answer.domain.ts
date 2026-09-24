import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const webPageAnswer = {
  id: "01a0655a-b2a8-78a3-9dec-43e67b15bf10",
  type: "page-type/domain",
  slug: "web-page-answer",
  definition: "the answer to a browser asking a site about pages and nav icons",
  parts: [
    "module/answer-following",
    "module/answer-page-types",
    "module/answer-page-write",
    "module/answer-pages",
    "module/nav-icon-svg",
    "module/page-listing-loader",
    "module/reader-access",
    "module/page-detail-loader",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every site serving pages over http answers from here rather than from its own copy.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The values that differ between two sites are passed in rather than written into a copy.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The three answers reaching a service-role client sit behind a `.server` folder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "How a site knows its reader is passed in, and every site passes one.",
    },
  ],
} as const satisfies Domain
