import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const schemeChoice = {
  id: "01a16f7d-6d4c-795e-a5fa-d02d8c6e9e65",
  type: "page-type/module",
  slug: "scheme-choice",
  definition: "the color schemes a reader chooses between",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A reader chooses the dark scheme, the light scheme or the system scheme.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value that is no scheme is read as the dark scheme.",
    },
  ],
  createdAt: "2026-10-24T19:57:33.386Z",
  updatedAt: "2026-10-24T21:28:38.090Z",
} as const satisfies Module
