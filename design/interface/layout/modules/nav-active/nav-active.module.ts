import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const navActive = {
  id: "01a05b82-8b9a-745f-97df-0cda03922d9c",
  type: "page-type/module",
  slug: "nav-active",
  definition: "whether a nav item matches the path being shown",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A nav item matches a path at a boundary between segments and nowhere else.",
    },
  ],
  createdAt: "2026-09-01T05:47:57.210Z",
  updatedAt: "2026-09-22T00:40:32.000Z",
} as const satisfies Module
