import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const titleStreaming = {
  id: "01a18409-5020-7c6c-9428-795f42953f1e",
  type: "page-type/module",
  slug: "title-streaming",
  definition: "the services a show or film Alan logs streams on",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A title stating a TMDB id is given the services TMDB says stream that title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A title TMDB answers nothing for keeps the services the title states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A title is given the streaming service pages the names TMDB says reach.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page for a name no service lists is written with the title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A title whose services the pages cannot be asked for keeps what it states.",
    },
  ],
  createdAt: "2026-10-28T19:42:45.279Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Module
