import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const chapterWriteAnswering = {
  id: "01a0e971-8b9b-767a-b780-c99d738ea190",
  type: "page-type/module",
  slug: "chapter-write-answering",
  definition: "what a route answers when Alan starts the next chapter of a written story",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The test proving this code sits beside the route serving this code.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller who is not signed in is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller signed in as any person but the action bar's player is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter is started, and its seats told, through the page forwarder.",
    },
  ],
} as const satisfies Module
