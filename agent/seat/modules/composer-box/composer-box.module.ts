import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const composerBox = {
  id: "01a17efa-321b-7be4-b8c1-d98795f47f0f",
  type: "page-type/module",
  slug: "composer-box",
  definition: "the rounded card a message is written in, with its round send button",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat's composer and a played story's action bar draw the same card.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What is attached sits above the box, and a row of buttons sits below it.",
    },
  ],
  createdAt: "2026-10-27T20:08:08.475Z",
  updatedAt: "2026-10-27T20:08:08.475Z",
} as const satisfies Module
