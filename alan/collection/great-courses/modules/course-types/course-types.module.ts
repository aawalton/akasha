import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const courseTypes = {
  id: "01a06579-f3d8-7000-9391-77da8f1eff7e",
  type: "page-type/module",
  slug: "course-types",
  definition: "the shapes of the courses and the topics that code reads from The Great Courses",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every field the catalogue hands over is read-only.",
    },
  ],
  createdAt: "2026-09-03T04:14:46.232Z",
  updatedAt: "2026-10-30T15:18:05.491Z",
} as const satisfies Module
