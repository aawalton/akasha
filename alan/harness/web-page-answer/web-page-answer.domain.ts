import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const webPageAnswer = {
  id: "01a0655a-b2a8-78a3-9dec-43e67b15bf10",
  type: "domain",
  slug: "web-page-answer",
  definition: "what a browser asking a site about pages and nav icons is answered with",
  parts: [
    "module/answer-page-types",
    "module/answer-page-write",
    "module/answer-pages",
    "module/nav-icon-svg",
  ],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Every site serving pages over http answers from here rather than from its own copy.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The values that differ between two sites are passed in rather than written into a copy.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The three answers reaching a service-role client sit behind a `.server` folder.",
    },
  ],
} as const satisfies Domain
