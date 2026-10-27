import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const playedSidebarColumn = {
  id: "01a17ef3-e8a6-7a59-97e3-36776ce237ae",
  type: "page-type/module",
  slug: "played-sidebar-column",
  definition: "one sidebar of a play screen on a desktop",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A sidebar runs the whole height of the window.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sidebar opens 500 pixels wide.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Dragging a sidebar's inner edge resizes it, and so do the arrow keys on that edge.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No sidebar is resized narrower than 320 pixels or wider than 800.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No sidebar is resized past leaving the turns 420 pixels.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The width each sidebar was left at is kept in the browser for the next visit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sidebar's head switches between the places on its side and closes the sidebar.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A panel drawn in a sidebar is drawn flat rather than as a card.",
    },
  ],
  createdAt: "2026-10-27T20:01:16.453Z",
  updatedAt: "2026-10-27T20:01:16.453Z",
} as const satisfies Module
