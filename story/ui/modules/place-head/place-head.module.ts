import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const placeHead = {
  id: "01a183ea-1193-7985-bfce-40d4aec9197e",
  type: "page-type/module",
  slug: "place-head",
  definition: "the head over an open place, naming it, closing it and holding its tabs",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A place head draws the place's name centred and bold, with a round close button at its right.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A place head draws the place's name larger than the tabs under the name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Under the name, the head holds the tabs the place's panels offer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule runs under the whole head.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every open place has a head, whether its panels offer several tabs, one tab or none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A place whose panels offer one tab still draws that tab.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Tabs with no head above them are drawn in a row of their own over a rule.",
    },
  ],
  createdAt: "2026-10-28T19:08:37.650Z",
  updatedAt: "2026-10-28T20:18:37.335Z",
} as const satisfies Module
