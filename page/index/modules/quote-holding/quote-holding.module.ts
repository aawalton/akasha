import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const quoteHolding = {
  id: "01a0a582-6d44-7000-9ebd-3e0bec1aaca3",
  type: "page-type/module",
  slug: "quote-holding",
  definition: "the files whose words are kept as they were said",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Whether the file at a path holds words kept as they were said is answered here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The property whose file that is says so, rather than the file's own name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A property naming its file is read where a page carrying it sits in that folder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A property whose entries sit beside a page is read from the section it names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which sections those are is worked out once for one face.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A face that will not answer holds no words kept that way rather than refusing.",
    },

    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a body.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here rewrites a body.",
    },
  ],
} as const satisfies Module
