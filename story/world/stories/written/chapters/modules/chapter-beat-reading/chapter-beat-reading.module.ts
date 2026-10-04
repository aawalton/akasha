import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const chapterBeatReading = {
  id: "01a10640-4ef7-778c-8653-5208f9c57e3f",
  type: "page-type/module",
  slug: "chapter-beat-reading",
  definition: "what a written chapter's beats hand its panels",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each picture on a beat is handed to the panels with the beat it shows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Beats that will not read hand the panels nothing rather than a refusal.",
    },
  ],
} as const satisfies Module
