import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pluginPagesOfType = {
  id: "01a0ddf0-276d-739e-83e3-a903bc9ecff3",
  type: "page-type/module",
  slug: "plugin-pages-of-type",
  definition: "every page of one page type, written into Lua where a call asks for them",
  code: "ts",
  test: "ts",
  reachedByPath: ["default"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A call to `$pagesOfType` becomes a Lua table of every page of the page type it is handed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The page type is read off the slug of the page handed in, so the call names an imported page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Where the call names a type, each page keeps only the properties that type has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The pages are written in the order of their paths.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A property holding null is left out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The pages are read from the index at the root directory the compile states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call handed no page carrying a slug refuses the compile.",
    },
  ],
} as const satisfies Module
