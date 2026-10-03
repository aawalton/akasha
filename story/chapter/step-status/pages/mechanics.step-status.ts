import type { StepStatus } from "akasha/story/chapter/step-status/step-status.page-type.types.ts"

export const mechanics = {
  id: "01a1024d-9f93-7d0a-bcf2-c0e594dac5a1",
  type: "page-type/step-status",
  slug: "mechanics",
  title: "Mechanics",
  definition:
    "the mechanics recorder's move, working out what each beat changes in numbers and items",
} as const satisfies StepStatus
