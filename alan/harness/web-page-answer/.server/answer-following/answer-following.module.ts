import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const answerFollowing = {
  id: "01a0d578-c0fa-751e-afec-ba89fb6d0097",
  type: "page-type/module",
  slug: "answer-following",
  definition: "how a website sends a browser changes to the pages the browser watches",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Any visitor opens a stream, signed in or not.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each follow is held to what its visitor may read of its page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A follow of a page type its visitor may not read is withheld and named as such.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A follow whose visitor reads its page type narrowed carries that narrow.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A narrow a browser says for itself is dropped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A site going away ends every stream it holds cleanly before it stops.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stream ended cleanly is opened again by its browser with no error shown.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A site's build carries its own copy of this module beside the one its server loads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every copy of this module in one process holds the same open streams.",
    },
  ],
  createdAt: "2026-09-24T22:10:55.866Z",
  updatedAt: "2026-10-30T16:05:05.131Z",
} as const satisfies Module
