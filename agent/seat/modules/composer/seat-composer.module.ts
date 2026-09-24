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
      statement: "Enter starts a new line, and a button sends.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Command or Control with Enter sends from a keyboard.",
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
      decisionKind: "decision-kind/gap",
      statement: "An image is attached to a message from beside the box.",
    },
  ],
} as const satisfies Module
