import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const fileShape = {
  id: "01a05bd6-c531-7062-bc98-1b9ed3fd2560",
  type: "module",
  slug: "file-shape",
  definition: "the shape a file-backed page's page type declares",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A question the pages refuse is dropped rather than held as the answer.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A page type's shape refuses.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A page type's declarations go unread here.",
    },
  ],
} as const satisfies Module
