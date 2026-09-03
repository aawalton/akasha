import type { Module } from "@akasha/code-system/module"

export const seatResolve = {
  id: "01a06949-b281-737a-9638-365e7ade018a",
  pageTypeSlug: "module",
  slug: "seat-resolve",
  definition: "finding the page behind each slug a seat is given, or refusing with what is there",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A document already gone when it is read is skipped rather than raised.",
    },
    {
      invariantKind: "departure",
      statement: "A read that fails for any reason but absence is raised.",
    },
    {
      invariantKind: "departure",
      statement: "A slug naming more than one file is refused rather than chosen between.",
    },
    {
      invariantKind: "departure",
      statement: "A slot stated twice is refused rather than resolved to either.",
    },
    {
      invariantKind: "departure",
      statement: "What a slot defaults to is read from the seat page type in akasha.",
    },
    {
      invariantKind: "departure",
      statement: "One refusal anywhere means nothing at all is assigned.",
    },
  ],
} as const satisfies Module
