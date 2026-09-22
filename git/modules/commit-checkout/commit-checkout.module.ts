import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const commitCheckout = {
  id: "01a0c9a0-60b4-71ba-858f-0defe52ed5f0",
  type: "page-type/module",
  slug: "commit-checkout",
  definition: "a folder holding exactly what a commit holds",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A checkout sits outside the repository whose commit that checkout holds.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No git folder sits in a checkout, so git reaches a checkout as no repository.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One checkout answers for a repository, whatever commit a caller asks for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A checkout is kept between the calls that read it rather than made for each.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A checkout is brought to a commit by writing only what that commit changed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Bringing a checkout forward takes away the paths the commit no longer holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A checkout holding nothing is filled from the commit whole.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A checkout says which commit that checkout was last brought to.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing writes to a checkout but the bringing forward.",
    },
  ],
} as const satisfies Module
