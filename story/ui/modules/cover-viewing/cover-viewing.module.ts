import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const coverViewing = {
  id: "01a0e85f-32b6-77c9-b863-bd97e3b7310f",
  type: "page-type/module",
  slug: "cover-viewing",
  definition: "a cover in a play screen's side panel opened whole over the page",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Clicking a cover opens it whole, fitted to the window, over the page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The cover opened is the image at its own size rather than the one the panel asks.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The view closes on Escape, a click outside it, or its close button.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A panel may lay controls of its own over the opened cover.",
    },
  ],
} as const satisfies Module
