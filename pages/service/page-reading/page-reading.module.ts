import type { Module } from "@akasha/code-system/module"

export const pageReading = {
  id: "01a05b1e-1347-77b8-9b46-d0b4f449e698",
  pageTypeSlug: "module",
  slug: "page-reading",
  definition: "the whole body standing at a path, and the commit it was read at",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A read answers with the whole body rather than with the keys a page declares.",
    },
    {
      invariantKind: "departure",
      statement: "A read names the commit its bodies were read at.",
    },
    {
      invariantKind: "departure",
      statement: "Every body one read answers with is read at that one commit.",
    },
    {
      invariantKind: "departure",
      statement: "A body is read out of the commit rather than off the working tree.",
    },
    {
      invariantKind: "departure",
      statement: "A path standing outside `akasha` is refused before anything is read.",
    },
    {
      invariantKind: "departure",
      statement: "A path holding a page's secret values is refused before anything is read.",
    },
    {
      invariantKind: "departure",
      statement: "A path holding a page's uncommitted values is refused before anything is read.",
    },
    {
      invariantKind: "departure",
      statement: "A path a page is placed at is withheld by the same rule.",
    },
    {
      invariantKind: "departure",
      statement: "One withheld path refuses the whole read.",
    },
    {
      invariantKind: "departure",
      statement: "A withheld path is refused rather than answered as nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A page is named by its page type and its slug.",
    },
    {
      invariantKind: "departure",
      statement: "A page named that way is placed by the index.",
    },
    {
      invariantKind: "departure",
      statement: "A page the index places nowhere is said to be unplaced.",
    },
    {
      invariantKind: "departure",
      statement: "A page the index places at more than one path refuses the read.",
    },
    {
      invariantKind: "departure",
      statement: "A path the commit does not carry answers as nothing rather than as empty text.",
    },
    {
      invariantKind: "departure",
      statement: "The bodies of one read come back through one git process rather than one each.",
    },
    {
      invariantKind: "departure",
      statement: "A read that throws is answered as a refusal rather than thrown on.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes.",
    },
    {
      invariantKind: "absence",
      statement: "A read takes no hold.",
    },
    {
      invariantKind: "gap",
      statement: "A body that is not text reads as the replacement character.",
    },
  ],
} as const satisfies Module
