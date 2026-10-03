import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const beatPictures = {
  id: "01a1030e-5e62-7d56-819f-279dd1590143",
  type: "page-type/module",
  slug: "beat-pictures",
  definition: "the pictures a written chapter's picture recorder sets on the beats they show",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A picture is one json line naming its beat, its image page and its anchor quote.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A picture shows a character in an outfit, or a setting with nobody in it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The anchor quote places the picture in the prose; the beat only groups it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Pictures keep the order handed in within a beat, and run in beat order.",
    },
  ],
} as const satisfies Module
