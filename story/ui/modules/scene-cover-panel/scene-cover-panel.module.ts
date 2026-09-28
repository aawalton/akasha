import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const sceneCoverPanel = {
  id: "01a0e7ff-1168-7fa8-b0c7-08190825f11d",
  type: "page-type/module",
  slug: "scene-cover-panel",
  definition: "the cover of the latest turn of play, in a panel of its own",
  code: "tsx",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn's cover is drawn in a panel of its own rather than among the characters.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The turn cover drawn opens on the latest turn that has a cover.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Arrows under the turn cover page through every turn at player that has a cover, drawn or not.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Outside those arrows, one button jumps to the first turn cover and one to the latest.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A button that would stay on the turn cover drawn is greyed out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Clicking the turn cover opens it whole, fitted to the window, over the page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "That view closes on Escape, a click outside it, or its close button, and its arrow keys page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The turn covers paged through are the ones the panel is handed rather than read here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn paged to is kept until a later turn is drawn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No panel is drawn where no turn is drawn or no turn handed has a cover.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cover is asked for at twice the width the panel draws it.",
    },
  ],
} as const satisfies Module
