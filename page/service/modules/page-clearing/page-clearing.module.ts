import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageClearing = {
  id: "01a0d88f-5018-77fa-93cd-f9916aa933fc",
  type: "page-type/module",
  slug: "page-clearing",
  definition: "whether a key a write clears or hands nothing may be left off a page",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A key cleared that the page type declares no property for is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key both cleared and handed over is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key kept beside the page is refused as cleared.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A key held as rows or in a file of its own name is refused as cleared, since the file would stay.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A key held in a file beside the page may be cleared, since that file goes with it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An optional key handed null or undefined is left off the page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key handed null is written as null where its property is nullable.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A required key handed undefined, or null where its property is not nullable, is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key kept beside the page or held in a file is written as it is handed.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a page.",
    },
  ],
} as const satisfies Module
