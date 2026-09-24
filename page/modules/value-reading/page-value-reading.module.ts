import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageValueReading = {
  id: "01a076b5-96a3-7e49-a821-ec55720b1f74",
  type: "page-type/module",
  slug: "page-value-reading",
  definition: "what a key of a page's value has, read off a value already in hand",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A key is taken as the type that key is asked for or as nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value naming a page by page type and slug is read here for its slug alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key naming a page or a list of pages is read here as a list of slugs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Such a list is read here for the pages of one page type alone where asked.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement:
        "One reader here answers empty text as empty text and another answers empty text as nothing.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Neither reader is exchanged for a module, because a module answers only one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key holding one record or a list of them is read here as a list of records.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A browser reaches this module and never the module loading a value from a file.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a file.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here imports a module node carries.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here loads a body.",
    },
  ],
} as const satisfies Module
