import type { Module } from "../../code-system/modules/module.page-type.ts"

export const courseTypes = {
  id: "01a06579-f3d8-7000-9391-77da8f1eff7e",
  pageTypeSlug: "module",
  slug: "course-types",
  definition: "a course, a subject, an episode, and the listings the catalogue hands them over in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every field the catalogue hands over is read-only.",
    },
  ],
} as const satisfies Module
