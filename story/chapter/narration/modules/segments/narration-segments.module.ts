import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const narrationSegments = {
  id: "01a10dc1-6462-7fc5-8567-7b9132654b76",
  type: "page-type/module",
  slug: "narration-segments",
  definition: "a chapter's prose cut into the segments narration speaks, each with its pause",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The same prose always gives the same segments.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The first segment is the first sentence alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A segment holds whole sentences of one paragraph, up to six hundred characters.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sentence longer than that is cut at its last comma or space before the limit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A title or an initial ends no sentence, and a closing quote stays with its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A scene break, a heading, a window or a screen leaves a longer pause than a paragraph.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Markdown is said as the words it marks.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The last segment of a chapter leaves the longer pause before the next chapter.",
    },
  ],
} as const satisfies Module
