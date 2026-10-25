import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const hallmarkListing = {
  id: "01a17496-2f57-7af2-b83f-e32414453f35",
  type: "page-type/module",
  slug: "hallmark-listing",
  definition: "the Hallmark films Wikipedia lists, each with the channel and day it first aired on",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The lists are read as Wikipedia's own markup rather than as a page drawn from it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A film's channel is the heading above its table, and Hallmark Channel where none is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A code in brackets after a title names the season the film first aired in.",
    },
  ],
  createdAt: "2026-10-25T19:42:42.006Z",
  updatedAt: "2026-10-25T19:42:42.006Z",
} as const satisfies Module
