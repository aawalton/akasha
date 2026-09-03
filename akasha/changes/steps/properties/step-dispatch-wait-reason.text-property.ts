import type { TextProperty } from "@akasha/pages-system/text-property"

export type StepDispatchWaitReason = string

export const stepDispatchWaitReason = {
  id: "01a06950-236c-7a30-b0d3-f6214dc5d8e9",
  pageTypeSlug: "text-property",
  slug: "step-dispatch-wait-reason",
  propertySlug: "dispatch-wait-reason",
  definition: "why the step has not been dispatched yet",
  max: 2000,
  nameFormatSlug: null,
} as const satisfies TextProperty
