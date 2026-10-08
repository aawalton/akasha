import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const dockerfileNextjs = {
  id: "01a06865-abff-7007-901d-2dddbd9755b3",
  type: "page-type/module",
  slug: "dockerfile-nextjs",
  definition: "a Next.js app's Dockerfile",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The source folders copied in are the ones the app's entry files reach.",
    },
  ],
  createdAt: "2026-09-03T17:51:28.767Z",
  updatedAt: "2026-09-22T13:43:11.000Z",
} as const satisfies Module
