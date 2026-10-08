import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const paths = {
  id: "01a06813-7b0f-7d70-b1b8-8c7051dcac51",
  type: "page-type/module",
  slug: "paths",
  definition: "the places a cluster's secrets, talosconfig and kubeconfig sit on disk",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The repository root is read from the checkout rather than climbed to.",
    },
  ],
  createdAt: "2026-09-03T16:21:42.287Z",
  updatedAt: "2026-09-15T18:34:44.000Z",
} as const satisfies Module
