import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const reviewFollowing = {
  id: "01a0deba-4cb9-70bb-9c94-f87f8a4ea527",
  type: "page-type/module",
  slug: "review-following",
  definition: "a review's images kept as the store says, with each grade and undo written",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A review asks the store for the images stating no grade, ordered by id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A review asks again when the image shown changes anywhere.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A review asks again on a timer, so an image graded elsewhere leaves the images held ahead.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A grade is written on the image page as any page property is written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An undo clears the grade on the image page rather than writing an empty one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Grades and undos are written one at a time in the order the keys were pressed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key is taken at once, and the write follows behind it.",
    },
  ],
} as const satisfies Module
