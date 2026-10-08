import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const throwableNormalizing = {
  id: "01a05c48-deeb-7018-8b07-72558879bc4c",
  type: "page-type/module",
  slug: "throwable-normalizing",
  definition: "a message and a stack read off whatever was thrown",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing thrown is left without a message.",
    },
  ],
  createdAt: "2026-09-01T09:24:34.667Z",
  updatedAt: "2026-09-24T23:22:29.000Z",
} as const satisfies Module
