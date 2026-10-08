import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const courseTypes = {
  id: "01a06579-f3d8-7000-9391-77da8f1eff7e",
  type: "page-type/module",
  slug: "course-types",
  definition: "a course, a subject, and the catalogue's listings of them",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every field the catalogue hands over is read-only.",
    },
  ],
  createdAt: "2026-09-03T04:14:46.232Z",
  updatedAt: "2026-09-22T13:42:40.000Z",
} as const satisfies Module
