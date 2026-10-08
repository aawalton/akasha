import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const storyDisplay = {
  id: "01a05b71-e543-7c87-8c6e-cfaef2c52761",
  type: "page-type/module",
  slug: "story-display",
  definition: "the sections a story's session is composed of, and how a story alerts",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A sheet panel may only ask for reveal keys the code names.",
    },
  ],
  createdAt: "2026-09-01T05:29:46.051Z",
  updatedAt: "2026-09-26T17:33:45.000Z",
} as const satisfies Module
