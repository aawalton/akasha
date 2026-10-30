import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const buildInputSources = {
  id: "01a05cee-e560-7116-bb78-4e76e90508fe",
  type: "page-type/module",
  slug: "build-input-sources",
  definition: "the paths in two repos that hold what a mobile cut is built from",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The shell side names the same repo paths the sim run tree delivers to the macbook.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The code side names a fixed path list that no app varies.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The files every shell compiles are handed in rather than looked up here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a checkout to find what a build is made from.",
    },
  ],
  createdAt: "2026-09-01T12:25:55.296Z",
  updatedAt: "2026-10-30T16:24:18.950Z",
} as const satisfies Module
