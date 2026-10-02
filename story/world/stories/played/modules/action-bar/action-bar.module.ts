import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const actionBar = {
  id: "01a0d48b-8f76-7e2b-9030-a05bc2c03057",
  type: "page-type/module",
  slug: "action-bar",
  definition: "the line a player types an action into and sends a game, over the actions waiting",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The actions waiting are drawn grey and italic above the line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The actions waiting are asked for every five seconds while a player is signed in.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "An action that failed to send is put back on the line with the error above it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An action draft the game holds is put on an empty line, once, and never sent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reader not signed in is asked to sign in rather than shown the line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn being made shows its action and the step making it above the line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That step is said to be worked only while a seat of the story is working.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A step no seat of the story is working is said to have stalled.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An action typed while a turn is being made is refused, and feedback still sends.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The line says whether any action waits, so an undo is offered only where none does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An undo the page menu made has the line read the story's draft again at once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The line rises above the keyboard on a phone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Enter sends, and Shift with Enter starts a new line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A phone shows no Send button, and the line takes its room.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn reaching the player raises a notice naming the story and the turn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Permission to notify is asked on a send rather than when the page opens.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The line says when its first read of the actions waiting has come back.",
    },
  ],
} as const satisfies Module
