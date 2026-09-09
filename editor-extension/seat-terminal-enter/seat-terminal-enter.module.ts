import type { Module } from "../../code-system/modules/module.page-type.ts"

export const seatTerminalEnter = {
  id: "01a07810-d1a0-7a18-9605-db774e7b7fc2",
  pageTypeSlug: "module",
  type: "module",
  slug: "seat-terminal-enter",
  definition: "the submit key pressed in a seat's terminal, passed on and marked as a message",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The key is passed to the terminal before the mark is asked for.",
    },
    {
      invariantKind: "departure",
      statement: "A mark that fails leaves the key already passed on.",
    },
    {
      invariantKind: "departure",
      statement: "A terminal with a seat is found by the terminal the panel's sweep named.",
    },
    {
      invariantKind: "departure",
      statement: "A terminal with no seat is passed the key and marks nobody.",
    },
    {
      invariantKind: "departure",
      statement: "Whether the focused terminal has a seat is published as a context.",
    },
    {
      invariantKind: "departure",
      statement: "The context is republished whenever the focused terminal changes.",
    },
    {
      invariantKind: "absence",
      statement: "No key other than the submit key is read here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here sweeps the terminals for their seats.",
    },
  ],
} as const satisfies Module
