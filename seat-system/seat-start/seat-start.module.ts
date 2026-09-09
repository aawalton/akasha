import type { Module } from "@akasha/code/module"

export const seatStart = {
  id: "01a069cb-0380-743c-a13d-87b9feb0bbf1",
  pageTypeSlug: "module",
  type: "module",
  slug: "seat-start",
  definition: "a seat created under a name and launched where the caller asks",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The ops dispatcher imports this module and calls the default export that module declares.",
    },
    {
      invariantKind: "departure",
      statement: "The command reads arguments and writes the answer.",
    },
    {
      invariantKind: "departure",
      statement: "The function the command calls reads no argument and writes no answer.",
    },
    {
      invariantKind: "departure",
      statement: "The parent a caller states is the parent the seat is given.",
    },
    {
      invariantKind: "departure",
      statement: "A start stating no parent reads the parent from this process's own environment.",
    },
    {
      invariantKind: "departure",
      statement:
        "A headless start launches the seat here and an interactive start leaves that seat detached.",
    },
    {
      invariantKind: "departure",
      statement: "A seat no page was written for is refused rather than launched blank.",
    },
    {
      invariantKind: "departure",
      statement:
        "A headless start answers the pid that start launched and an interactive start answers no pid.",
    },
  ],
} as const satisfies Module
