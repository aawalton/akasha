import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const indexCarrying = {
  id: "01a09b7d-f088-7d22-88c5-53f5c0901921",
  type: "page-type/module",
  slug: "index-carrying",
  definition: "the index files a change carries among its own file changes",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A change carries a file for every answer it turns under an index git holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which indexes git holds is asked of the index the change leaves.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An index git holds none of is carried by nothing here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change carries the file beside every page whose references it turns.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change carries the file beside every page whose own values it turns.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Such a file is carried whatever indexes git holds, being no index file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A change carries the shapes file beside every page type whose properties it turns.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A shapes file no commit holds yet is left to the generator making that file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The settle works that body out once, so what is written and what is carried agree.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The answers are read off the index the change leaves rather than worked out here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path already holding what the change leaves is carried by no row.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path the base commit holds at no body is carried as an addition.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An answer the change empties is carried as a removal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "No generator writes a page, so the answers a change turns are the answers its own rows turn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A change whose shadow could not be worked out carries nothing rather than refusing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing here refuses a landing.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a file.",
    },
  ],
} as const satisfies Module
