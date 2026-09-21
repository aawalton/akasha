import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const gradeTarget = {
  id: "01a09514-c56e-72ac-8c78-574b5fb4c1ff",
  type: "page-type/argument",
  slug: "grade-target",
  said: "--target",
  takes: "which sort of page the grade is recorded onto",
  value: "text",
  placeholder: "artist|song|track",
} as const satisfies Argument
