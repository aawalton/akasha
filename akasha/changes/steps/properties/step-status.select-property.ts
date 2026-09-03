import type { SelectProperty } from "@akasha/pages-system/select-property"

export const stepStatus = {
  id: "01a06950-236c-73c6-a101-562280bbef7b",
  pageTypeSlug: "select-property",
  slug: "step-status",
  propertySlug: "status",
  definition: "where a step is between being minted and reaching its verdict",
  values: [
    "pending",
    "dispatching",
    "launching",
    "running",
    "passed",
    "failed",
    "blocked",
    "skipped",
    "answered-elsewhere",
    "overtaken",
  ],
} as const satisfies SelectProperty

export type StepStatus = (typeof stepStatus.values)[number]
