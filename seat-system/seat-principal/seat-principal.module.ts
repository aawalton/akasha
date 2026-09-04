import type { Module } from "@akasha/code-system/module"

export const seatPrincipal = {
  id: "01a06949-b281-758a-b03f-cad660b7a2e7",
  pageTypeSlug: "module",
  slug: "seat-principal",
  definition: "who a seat answers to, read from its page as a person or as the fleet",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat with a person named on its page answers to that person.",
    },
    {
      invariantKind: "departure",
      statement: "A seat with no person but a principal seat name answers to the fleet.",
    },
    {
      invariantKind: "departure",
      statement: "A seat with neither value answers to no one.",
    },
    {
      invariantKind: "departure",
      statement: "The principal seat's id is looked up from the principal seat name.",
    },
    {
      invariantKind: "departure",
      statement: "A principal that was never written is shown as a dash on the line.",
    },
  ],
} as const satisfies Module
