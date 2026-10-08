import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const gradeTarget = {
  id: "01a09514-c56e-72ac-8c78-574b5fb4c1ff",
  type: "page-type/argument",
  slug: "grade-target",
  said: "--target",
  takes: "which sort of music page the call names",
  value: "text",
  placeholder: "artist|song|track|release",
  createdAt: "2026-09-12T10:06:01.582Z",
  updatedAt: "2026-09-21T20:16:23.000Z",
} as const satisfies Argument
