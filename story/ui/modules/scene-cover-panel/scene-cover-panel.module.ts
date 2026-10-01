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
        "A chapter's scenes are paged as turns are, named as scenes and opening on the first.",
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
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A button on the turn cover, and on its full-size view, asks the story to draw that cover again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The ask is written to the story played as its signed-in writer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "While an ask is out the button spins and a second click asks nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The ask is settled once the story no longer holds it, and a refusal it left is shown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An ask unsettled after twenty minutes is given up and said to be slow.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The new cover arrives the way every change to the turns arrives.",
    },
  ],
} as const satisfies Module
