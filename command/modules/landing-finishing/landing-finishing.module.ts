import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const landingFinishing = {
  id: "01a094e6-a05f-7213-aac0-264169fdd44c",
  type: "page-type/module",
  slug: "landing-finishing",
  definition: "the work a landing does once its commit has landed",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "What the landing cleared is handed in rather than cleared here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The units are kept after the links are placed.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here is done while the landing holds the lock.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here draws a picture for the editor.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder is linked for a page that moved rather than for every page there is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page no move carries has the folder it sits in linked by nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A link that could not be placed is answered rather than refusing the landing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A unit that could not be kept is answered rather than refusing the landing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A landing that committed nothing is finished the same way.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here refuses a landing that has already committed.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a body the change carries.",
    },
  ],
} as const satisfies Module
