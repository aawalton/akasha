import type { Module } from "@akasha/code-system/module"

export const seatAttributes = {
  id: "01a06949-b281-754d-abc3-b81859567424",
  pageTypeSlug: "module",
  slug: "seat-attributes",
  definition:
    "the persona, domain and role declared of an agent, with the mode its session started in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An attribute is taken from the seat page field named for the key plus -slug.",
    },
    {
      invariantKind: "departure",
      statement: "An attribute whose value is empty or is not text is absent.",
    },
    {
      invariantKind: "departure",
      statement: "An agent's own attributes are empty where no seat is named for it.",
    },
    {
      invariantKind: "departure",
      statement: "A start mode that is neither interactive nor headless is no mode.",
    },
    {
      invariantKind: "departure",
      statement: "An agent whose start mode was never written reads as headless.",
    },
  ],
} as const satisfies Module
