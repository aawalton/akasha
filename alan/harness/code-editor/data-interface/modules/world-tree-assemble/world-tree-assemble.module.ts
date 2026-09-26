import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const worldTreeAssemble = {
  id: "01a0de0c-d6b7-7452-8b01-8636351df5bb",
  type: "page-type/module",
  slug: "world-tree-assemble",
  definition:
    "the worlds read out of the pages, each with the stories naming that world beneath it",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every world hangs under one top row.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story hangs under the world that story names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Worlds and stories are drawn by title and ordered by title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row carries the address of its page on alanwalton.com.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The top row carries the address listing every world.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story naming no world drawn here is left out and named as unreached.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the index or a file.",
    },
  ],
} as const satisfies Module
