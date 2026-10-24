import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const schemeChoice = {
  id: "01a16f7d-6d4c-795e-a5fa-d02d8c6e9e65",
  type: "page-type/module",
  slug: "scheme-choice",
  definition: "the color scheme a reader chose, read and kept in the browser",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A reader chooses the dark scheme, the light scheme or the system scheme.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A choice is kept under the key the scheme boot reads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A choice tells the scheme boot at once, so the page changes without a reload.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The server knows no choice, so a page it renders shows none until it hydrates.",
    },
  ],
  createdAt: "2026-10-24T19:57:33.386Z",
  updatedAt: "2026-10-24T19:57:33.386Z",
} as const satisfies Module
