import type { Module } from "@akasha/code-system/module"

export const terminalSeatStating = {
  id: "01a0680a-fa30-7f40-a5ba-c3374e395ecb",
  pageTypeSlug: "module",
  slug: "terminal-seat-stating",
  definition: "the shell a launcher reads and writes a seat's attributes through",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The seat call is asked with one JSON payload on its input stream.",
    },
    {
      invariantKind: "departure",
      statement: "A value written into a payload is escaped before the payload is composed.",
    },
    {
      invariantKind: "departure",
      statement: "An attribute nobody stated is left out of the payload rather than sent empty.",
    },
    {
      invariantKind: "departure",
      statement:
        "The words a caller typed are sorted into slots by the seat call rather than here.",
    },
    {
      invariantKind: "departure",
      statement: "A sort that will not answer stops the launch rather than guessing the slots.",
    },
    {
      invariantKind: "departure",
      statement: "A seat's name is spelled by the seat call rather than by the shell.",
    },
    {
      invariantKind: "departure",
      statement: "A name the seat call would not spell seats the persona under its own name.",
    },
    {
      invariantKind: "departure",
      statement: "A seat is given a default and a mode in a call apart from its attributes.",
    },
    {
      invariantKind: "departure",
      statement:
        "A seat holding no mode returns decisions it would otherwise put to its principal.",
    },
    {
      invariantKind: "departure",
      statement: "A seat a person handles states no principal, because the person is the subject.",
    },
    {
      invariantKind: "departure",
      statement: "Either call failing is said on the error stream and the launch carries on.",
    },
    {
      invariantKind: "stopgap",
      statement: "The path to the seat call is spelled rather than imported, to pull in no writer.",
    },
  ],
} as const satisfies Module
