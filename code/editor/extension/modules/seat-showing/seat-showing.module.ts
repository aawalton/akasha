import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatShowing = {
  id: "01a0686b-bfe9-7ca6-919b-b3b0a47d62d8",
  type: "module",
  slug: "seat-showing",
  definition: "what a click on a seat brings up, and the column it comes up in",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat working in a terminal in this window has that terminal brought forward.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat with no terminal here has its transcript opened instead.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A column already remembered for the seat is taken where that column is open.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An ancestor's column is taken where no column is remembered for the seat.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The nearest ancestor with a terminal is the ancestor whose column is taken.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The lowest open column is taken where neither column is to be had.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Which column was chosen and why is said in the output.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A lookup with no seat finds no terminal for any seat.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here changes the work a seat is doing.",
    },
  ],
} as const satisfies Module
