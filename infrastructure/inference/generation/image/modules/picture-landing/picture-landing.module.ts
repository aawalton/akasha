import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pictureLanding = {
  id: "01a0c611-36c9-75fc-beac-236b54b0894c",
  type: "page-type/module",
  slug: "picture-landing",
  definition: "a picture made into an image page, with its bytes placed beside that page",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The slug is worked out from the bytes, so the same picture lands once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The ending is read off the bytes, and bytes that are neither png nor jpg are refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page is landed by naming it to the pages service, which places it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The bytes are placed through the pages service rather than written on disk here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A picture whose page is already there gets its bytes placed and no second page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every writer of a picture, on the workstation or in a pod, lands it this way.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page landed and the bytes placed are each pushed into the caller's `done`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A picture already landed is read back by its slug rather than by a path.",
    },
  ],
} as const satisfies Module
