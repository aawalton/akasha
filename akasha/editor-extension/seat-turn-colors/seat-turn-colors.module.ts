import type { Module } from "../../code-system/modules/module.page-type.ts"

export const seatTurnColors = {
  id: "01a0680d-8b64-7000-9775-e45a6bce09cf",
  pageTypeSlug: "module",
  slug: "seat-turn-colors",
  definition:
    "the color each agent's turn is drawn in, and the folder every seat's page is watched in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat's page sits in the akasha folder and nowhere else.",
    },
    {
      invariantKind: "departure",
      statement: "Every watcher a feature registers is built from the seat folder named here.",
    },
    {
      invariantKind: "departure",
      statement: "A seat's sidecar is matched as an uncommitted TypeScript file.",
    },
    {
      invariantKind: "departure",
      statement: "The seat folder is answered as a real path rather than as the link to it.",
    },
    {
      invariantKind: "departure",
      statement: "The turn colors are asked of a child rather than read here.",
    },
    {
      invariantKind: "constraint",
      statement: "Reading a seat's turn state here would want a transpiler only bun carries.",
    },
    {
      invariantKind: "departure",
      statement: "An answer's colors are taken from `colors` or from `colours`.",
    },
    {
      invariantKind: "constraint",
      statement: "An answer that is no object is refused.",
    },
    {
      invariantKind: "constraint",
      statement: "An answer carrying neither `colors` nor `colours` is refused.",
    },
    {
      invariantKind: "constraint",
      statement: "A color that is no non-empty string is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A color name the palette does not hold is dropped rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "No agent ids is no call.",
    },
  ],
} as const satisfies Module
