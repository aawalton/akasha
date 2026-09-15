import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const courseTypes = {
  id: "01a06579-f3d8-7000-9391-77da8f1eff7e",
  type: "module",
  slug: "course-types",
  definition: "a course, a subject, and the listings the catalogue hands them over in",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every field the catalogue hands over is read-only.",
    },
  ],
} as const satisfies Module
