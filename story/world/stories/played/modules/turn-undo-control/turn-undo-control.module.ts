import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnUndoControl = {
  id: "01a0f1cc-0384-7697-8ba3-b8c1f839cdad",
  type: "page-type/module",
  slug: "turn-undo-control",
  definition: "the page-menu item asking a story played to undo its latest turn",
  code: "tsx",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn still being made is offered to be cancelled.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The latest turn at player, with nothing sent after it, is offered to be taken back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The offer is an item in the page's own menu rather than a button always shown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page menu offers at most one undo, the one the latest turn allows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing is undone until the player confirms it in a dialog.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The dialog stays open while the ask is out, and shows a refusal in place.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A confirmed undo is an ask left on the story, which the workstation answers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An ask the workstation refuses shows its refusal in the command's own words.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An undone turn has the action bar read the story's draft again at once.",
    },
  ],
} as const satisfies Module
