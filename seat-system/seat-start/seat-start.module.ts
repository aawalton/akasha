import type { Module } from "@akasha/code-system/module"

export const seatStart = {
  id: "01a069cb-0380-743c-a13d-87b9feb0bbf1",
  pageTypeSlug: "module",
  slug: "seat-start",
  definition: "a seat created under a name and launched where the caller asks",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The ops dispatcher imports this module and calls the default export it declares.",
    },
    {
      invariantKind: "departure",
      statement:
        "The parent is read from this process's own environment rather than from an argument.",
    },
    {
      invariantKind: "departure",
      statement:
        "A headless start launches the seat here and an interactive one leaves it detached.",
    },
    {
      invariantKind: "departure",
      statement: "A seat no page was written for is refused rather than launched blank.",
    },
  ],
} as const satisfies Module
