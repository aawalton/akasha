import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const quoteHolding = {
  id: "01a0a582-6d44-7000-9ebd-3e0bec1aaca3",
  type: "module",
  slug: "quote-holding",
  definition: "the files whose words are kept as they were said",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Whether the file at a path holds words kept as they were said is answered here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The property whose file that is says so, rather than the file's own name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A property naming its file is read where a page carrying it sits in that folder.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A property whose entries sit beside a page is read from the section it names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Which sections those are is worked out once for one face.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A face that will not answer holds no words kept that way rather than refusing.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "Words a page states inside its own file are answered for nowhere here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a body.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here rewrites a body.",
    },
  ],
} as const satisfies Module
