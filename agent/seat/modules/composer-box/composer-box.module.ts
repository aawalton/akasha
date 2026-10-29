import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const composerBox = {
  id: "01a17efa-321b-7be4-b8c1-d98795f47f0f",
  type: "page-type/module",
  slug: "composer-box",
  definition: "the rounded card or line a message is written in, with its round send button",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A seat's composer draws a card; a chat's message box and a story's action bar draw one line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A line stays one line tall until more is typed, then grows to a maximum and scrolls.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "On a card, what is attached sits above the text box and a row of buttons below it.",
    },
  ],
  createdAt: "2026-10-27T20:08:08.475Z",
  updatedAt: "2026-10-29T14:22:14.000Z",
} as const satisfies Module
