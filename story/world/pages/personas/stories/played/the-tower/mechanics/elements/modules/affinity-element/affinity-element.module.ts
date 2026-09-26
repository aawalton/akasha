import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const affinityElement = {
  id: "01a0c504-b68b-7a91-9eef-eb74770de901",
  type: "page-type/module",
  slug: "affinity-element",
  definition: "the six elements an affinity is of, each with its sense, its reach and its cost",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An element gives a sense of itself to whoever holds an affinity of it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An element names the acts an affinity of it sweetens.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An element names the one pool a rough absorption of it takes its cost from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Heat, flame and ember are one element, named by the Tower's page for ember.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An element here is named by the slug of the Tower's page for that element.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Cold is no element a climber absorbs.",
    },
  ],
} as const satisfies Module
