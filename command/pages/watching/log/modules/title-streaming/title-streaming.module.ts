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
  ],
  createdAt: "2026-10-28T19:42:45.279Z",
  updatedAt: "2026-10-28T19:42:45.279Z",
} as const satisfies Module
