import type { Module } from "@akasha/code-system/module"

export const seatFlex = {
  id: "01a06949-b281-72df-a9c3-507005e3dfd2",
  pageTypeSlug: "module",
  slug: "seat-flex",
  definition: "a seat's flex, read out of its name, with the rules for refusing one",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A flex is read from the seat's name rather than from its page.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent takes the flex of the seat above it.",
    },
    {
      invariantKind: "departure",
      statement: "A seat that states a person came to exist by being opened.",
    },
    {
      invariantKind: "departure",
      statement: "A seat that states a principal seat name came to exist by being spawned.",
    },
    {
      invariantKind: "departure",
      statement: "Only a seat shown to have been spawned is given a flex.",
    },
    {
      invariantKind: "departure",
      statement: "No seat gives itself a flex.",
    },
  ],
} as const satisfies Module
