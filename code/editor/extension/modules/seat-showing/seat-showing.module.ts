import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatShowing = {
  id: "01a0686b-bfe9-7ca6-919b-b3b0a47d62d8",
  type: "page-type/module",
  slug: "seat-showing",
  definition: "what showing a seat from its menu brings up, and the column chosen for it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat working in a terminal in this window has that terminal brought forward.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat with no terminal here has its transcript opened instead.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A column already remembered for the seat is taken where that column is open.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An ancestor's column is taken where no column is remembered for the seat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The nearest ancestor with a terminal is the ancestor whose column is taken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The lowest open column is taken where neither column is to be had.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which column was chosen and why is said in the output.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A lookup with no seat finds no terminal for any seat.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here changes the work a seat is doing.",
    },
  ],
} as const satisfies Module
