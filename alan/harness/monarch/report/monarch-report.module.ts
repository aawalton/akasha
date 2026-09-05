import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const monarchReport = {
  id: "01a06867-e5ed-751c-b661-1084d5afcf9e",
  pageTypeSlug: "module",
  slug: "monarch-report",
  definition: "what the rules would do to the history, said as evidence rather than as a proposal",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Nothing is written; the report says the effect the rules would have and stops.",
    },
    {
      invariantKind: "departure",
      statement: "A transaction reached by several rules is decided by the first.",
    },
    {
      invariantKind: "departure",
      statement: "The rules that did not decide are reported as shadowed.",
    },
    {
      invariantKind: "departure",
      statement: "A rule is scored only inside the trusted window.",
    },
    {
      invariantKind: "departure",
      statement: "A disagreement inside the window is shown in full.",
    },
    {
      invariantKind: "departure",
      statement:
        "A reserving rule is reported by the standing category on rows caught, grouped by the bank's words.",
    },
    {
      invariantKind: "departure",
      statement: "An ambiguity is reported with every candidate.",
    },
    {
      invariantKind: "departure",
      statement: "A candidate outside the history read is said to be outside that history.",
    },
    {
      invariantKind: "departure",
      statement:
        "A transaction no rule reached is reported by merchant as evidence rather than as a proposal.",
    },
    {
      invariantKind: "departure",
      statement: "A list cut to its limit says how many more there were.",
    },
  ],
} as const satisfies Module
