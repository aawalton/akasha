import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const narrationPlayhead = {
  id: "01a10dd0-f13a-787c-a1a3-f4f3bb9ab4b5",
  type: "page-type/module",
  slug: "narration-playhead",
  definition: "what a narration's playhead asks for as it moves through the chapters",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Playing the last chapter in the stream asks for the chapter after it, once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter is read once it plays across its own end, and only once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A leap or a scrub past a chapter's end marks that chapter read in no case.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Going back more than a moment into a chapter returns to that chapter's start.",
    },
  ],
} as const satisfies Module
