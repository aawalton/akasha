import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnHanding = {
  id: "01a0e949-667e-7c20-a21e-7af61ed6ae8c",
  type: "page-type/module",
  slug: "turn-handing",
  definition: "what one step hands in to a played turn's advance, read off the call",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An advance naming no step's output hands in the world builder's lore.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A beats file holds one beat to a line, each a plain line or a json record.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A prose file holds the prose itself.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A prose file naming a beat to a line is each beat's prose.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pictures file holds one picture to a line, each naming the beat it shows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A title is handed in only with a written chapter's prose, and always with it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A title's slug drops its apostrophes, so a possessive stays one word.",
    },
  ],
} as const satisfies Module
