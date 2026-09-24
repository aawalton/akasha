import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatComposer = {
  id: "01a0d495-78d5-7ce9-aae8-5a65074332ad",
  type: "page-type/module",
  slug: "seat-composer",
  definition: "the box on a seat's page where Alan writes that seat a message",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Enter sends, and Shift with Enter starts a new line, on every device.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Enter pressed while a word is still being composed sends nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message is sent to the seat by that seat's id rather than by its name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A send refused says why in the words the route refused it with.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An image is attached to a message from beside the box.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The phone offers its photos and its camera alike when an image is attached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An image attached is shown small above the box until it is removed or sent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An image is kept only once the message is sent, and is sent as a jpg.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message carries at most eight images.",
    },
  ],
} as const satisfies Module
