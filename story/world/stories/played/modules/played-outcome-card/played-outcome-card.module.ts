import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const playedOutcomeCard = {
  id: "01a183a6-c667-7b2e-8231-18849a983c8e",
  type: "page-type/module",
  slug: "played-outcome-card",
  definition: "the card drawing one action's settled outcome, and the roll it lands by",
  code: "tsx",
  test: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A card is laid out as Voyage lays out its outcome card, in our own surfaces.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A card opens with the acting character's name in its color, then the action.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The check sits indented beneath, as difficulty, outcome tier, then terms.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A card whose line names no actor and no action opens with the check.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The outcome tier is drawn in the color its own page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A card a browser has not seen rolls through the seven tiers before landing on its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pending card spins through the tiers until the outcome it waits on lands.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A card landing slows over a fixed time before stopping on its own tier.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A browser keeps the rolls it has seen, so a card seen again lands at once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter's card never rolls.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reader asking for reduced motion sees no roll.",
    },
  ],
  createdAt: "2026-10-28T17:55:07.494Z",
  updatedAt: "2026-10-28T18:12:14.981Z",
} as const satisfies Module
