import type { Module } from "../../code-system/modules/module.page-type.ts"

export const seatShowing = {
  id: "01a0686b-bfe9-7ca6-919b-b3b0a47d62d8",
  pageTypeSlug: "module",
  slug: "seat-showing",
  definition: "what a click on a seat brings up, and the column it comes up in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat working in a terminal in this window has that terminal brought forward.",
    },
    {
      invariantKind: "departure",
      statement: "A seat with no terminal here has its transcript opened instead.",
    },
    {
      invariantKind: "departure",
      statement: "A column already remembered for the seat is taken where that column is open.",
    },
    {
      invariantKind: "departure",
      statement: "An ancestor's column is taken where none is remembered.",
    },
    {
      invariantKind: "departure",
      statement: "The nearest ancestor holding a terminal is the one whose column is taken.",
    },
    {
      invariantKind: "departure",
      statement: "The lowest open column is taken where neither is to be had.",
    },
    {
      invariantKind: "departure",
      statement: "Which column was chosen and why is said in the output.",
    },
    {
      invariantKind: "departure",
      statement: "A sweep that reads no process rows finds no terminal for any seat.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here changes what a seat is doing.",
    },
  ],
} as const satisfies Module
