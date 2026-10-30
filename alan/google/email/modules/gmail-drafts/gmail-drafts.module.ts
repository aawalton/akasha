import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const gmailDrafts = {
  id: "01a05c0e-3730-79a1-884f-5caf37ea35cf",
  type: "page-type/module",
  slug: "gmail-drafts",
  definition: "how code keeps an unsent email in Gmail",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A draft is built from the same body a sent message would be.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A draft is named as soon as gmail has taken that draft.",
    },
  ],
  createdAt: "2026-09-01T08:20:30.640Z",
  updatedAt: "2026-10-30T15:17:08.954Z",
} as const satisfies Module
