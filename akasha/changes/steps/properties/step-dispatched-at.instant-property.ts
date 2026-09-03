import type { InstantProperty } from "@akasha/pages-system/instant-property"

export type StepDispatchedAt = string

export const stepDispatchedAt = {
  id: "01a06950-236c-7829-87aa-baf4d3b7056d",
  pageTypeSlug: "instant-property",
  slug: "step-dispatched-at",
  propertySlug: "dispatched-at",
  definition: "when the step was handed to the dispatcher",
} as const satisfies InstantProperty
