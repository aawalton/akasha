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
      statement: "A domain is found by its address first and by its bare slug after.",
    },
    {
      invariantKind: "departure",
      statement: "A bare slug names whichever page claimed it first.",
    },
    {
      invariantKind: "departure",
      statement: "A slot stated twice is refused.",
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
