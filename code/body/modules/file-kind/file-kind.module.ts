import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const fileKind = {
  id: "01a06553-a9b6-77a7-a681-f8ecbf29a0b3",
  type: "page-type/module",
  slug: "file-kind",
  definition: "the kind of file a path's own name says the file is",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A path's name alone says its kind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A whole basename is read before any extension of that basename is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path ending `.ts` or `.tsx` is TypeScript.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Whether a path is TypeScript is answered from the ending alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name ending `.template` is read as the same name without that ending.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name no rule reaches says no kind rather than a kind meaning unknown.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here opens the file the path names.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here says whether a kind is text or bytes.",
    },
  ],
} as const satisfies Module
