import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatComposer = {
  id: "01a0d495-78d5-7ce9-aae8-5a65074332ad",
  type: "page-type/module",
  slug: "seat-composer",
  definition: "the part of a seat's page where Alan writes a message to the seat",
  code: "tsx",
  test: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Where the primary pointer is fine, Enter sends and Shift with Enter starts a new line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Where the primary pointer is coarse, as a phone's is, Return starts a new line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Where the primary pointer is coarse, only the send button sends.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The box asks the phone for a Return key rather than a Send or Go key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The box sits in no form, so nothing submits it but the send button.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A tablet with a keyboard has a coarse primary pointer, so Return starts a line there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The box and its buttons sit in one rounded card, as the Claude app's composer does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The box grows with what is written, and the row of buttons sits below it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A round send button with an arrow sits at the right of that row, on every device.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The send button is disabled while there is nothing to send.",
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
      statement: "A message names its own id, so sending it again never writes it twice.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A send that gets no answer is sent again four times over about fifteen seconds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A send still unanswered is shown as maybe sent, with a way to send it again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An image is attached from a round plus button at the left of that row.",
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
      statement: "An image is kept for the seat it is sent to, named by that seat's id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message carries at most eight images.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A microphone left of the send button starts and ends talking to the seat by voice.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A message being written is kept in the browser as it is typed, and a reload restores it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message being written is kept by the seat's id and the person signed in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message kept that way goes only once the route says the send was taken.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "An image attached is not kept that way, and a reload drops it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message taken back returns its words to the box.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Words returned go before what the box holds, with a blank line between.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Typing in the box tells the seat's page the person signed in is typing.",
    },
  ],
  createdAt: "2026-09-24T18:02:40.725Z",
  updatedAt: "2026-10-24T22:38:18.085Z",
} as const satisfies Module
