import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const buildPatch = {
  id: "01a06813-7b0f-7a67-b8a8-51d1b4874930",
  type: "page-type/module",
  slug: "build-patch",
  definition: "a node and its cluster turned into a Talos machine-config patch",
  decisions: [
    { decisionKind: "decision-kind/departure", statement: "Every node admits a user namespace." },
  ],
  code: "ts",
  createdAt: "2026-09-03T16:21:42.287Z",
  updatedAt: "2026-09-15T18:34:44.000Z",
} as const satisfies Module
