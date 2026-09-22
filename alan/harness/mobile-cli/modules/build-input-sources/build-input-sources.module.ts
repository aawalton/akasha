import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const buildInputSources = {
  id: "01a05cee-e560-7116-bb78-4e76e90508fe",
  type: "page-type/module",
  slug: "build-input-sources",
  definition: "the two repo-and-paths pairs holding a mobile build's inputs",
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
} as const satisfies Module
