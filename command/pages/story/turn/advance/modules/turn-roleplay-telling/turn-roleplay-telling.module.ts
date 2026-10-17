import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnRoleplayTelling = {
  id: "01a14ad9-e67d-7b6d-b50d-1adbb916b211",
  type: "page-type/module",
  slug: "turn-roleplay-telling",
  definition: "the notices a played turn's move sends, roleplayed or not",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A roleplayed turn's move is told to each roleplay-recorder seat of its story.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "No game master, world builder or writer seat is told of a roleplayed turn's move.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A roleplayed turn leaving world-builder pushes Alan that the turn is ready.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A roleplayed turn reaching player pushes Alan nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn that is not roleplayed is told as any played turn is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A story with no roleplay-recorder seat up is named as a fault, and undoes nothing.",
    },
  ],
  createdAt: "2026-10-17T17:12:36.732Z",
  updatedAt: "2026-10-17T17:54:51.718Z",
} as const satisfies Module
