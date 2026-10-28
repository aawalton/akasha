import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryHousePlacement = {
  id: "01a1842e-3580-7f1b-99e1-26cbd323c12c",
  type: "page-type/module",
  slug: "inventory-house-placement",
  definition: "placing the furnishings a rule's chain sends to the house the carrier is in",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the storage carrier places furnishings, in a house the account owns.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A furnishing is placed here where its rule's chain names this house first with room.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A house earlier in the chain with known room for the stack keeps the stack for itself.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The backpack and the furniture vault are judged for furnishings, and nothing is recorded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The smallest stacks are placed first, and a stack starts only where all of it fits.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each furnishing is placed where the carrier is, one request a pace apart.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each placement request is counted in the shared server action window.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A placement waits where that window is full, past the pace.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A refused request stops the run and says why, and what is left waits for the next visit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run says how many it placed and how many stacks it left.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The placements themselves are recorded by the placed furnishing events.",
    },
  ],
  createdAt: "2026-10-28T20:23:03.295Z",
  updatedAt: "2026-10-28T21:05:15.427Z",
} as const satisfies Module
