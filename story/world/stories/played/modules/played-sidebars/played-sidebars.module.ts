import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const playedSidebars = {
  id: "01a17ea7-d2fe-7f6c-a4f9-161f5893c472",
  type: "page-type/module",
  slug: "played-sidebars",
  definition: "the arrangement of a play screen's turns, top bar and sidebars",
  code: "tsx",
  test: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The top bar has a button for each sidebar place the story names a panel in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A button stays highlighted while the place it opens is open.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Character and journal open in a left sidebar, and map and chat in a right one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each sidebar shows one place at a time, and both sidebars can be open at once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An open sidebar pushes the turns aside rather than covering them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sidebar is as wide as the old aside, so a panel is drawn at the width it had.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No open sidebar leaves the turns narrower than 460 pixels.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Where both sidebars leave the turns too narrow to read, opening one side closes the other.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Where one sidebar leaves the turns too narrow, an open place takes their column.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "On a phone, a bottom tab bar opens each place full screen over the turns.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "On a phone, an open place has a switch to the other place on its side.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The places open beside the turns are kept in the browser for the next visit.",
    },
  ],
  createdAt: "2026-10-27T18:38:10.173Z",
  updatedAt: "2026-10-27T18:50:23.026Z",
} as const satisfies Module
