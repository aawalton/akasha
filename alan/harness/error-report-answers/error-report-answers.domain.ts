import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const errorReportAnswers = {
  id: "01a08e53-fd2d-75d9-9028-e41da4c81f57",
  type: "domain",
  slug: "error-report-answers",
  definition: "what a site answers a browser reporting an error with",
  parts: ["module/answer-error-report"],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Every site taking error reports over http answers from here rather than from its own copy.",
    },
    {
      invariantKind: "departure",
      statement: "The origins a site answers cross-origin are passed in rather than written in.",
    },
  ],
} as const satisfies Domain
