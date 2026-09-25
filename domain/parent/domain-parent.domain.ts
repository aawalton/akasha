import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const domainParent = {
  id: "01a0675b-16df-7224-bb73-2d7ff8395955",
  type: "page-type/domain",
  slug: "domain-parent",
  definition: "a domain's parent domain",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A domain needed only to read this domain is required reading rather than its parent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A layer a domain is built on is not a parent of that domain.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type extending `domain` is not a reason for `domain` to be a parent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page of page type `domain` sits directly in the folder of the page naming it a part.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every domain but `akasha` is named a part by one page, and `akasha` by none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every domain but the root is a part of a domain.",
    },
  ],
} as const satisfies Domain
