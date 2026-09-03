import type { InstantProperty } from "@akasha/pages-system/instant-property"

export type StepDispatchWaitSince = string

export const stepDispatchWaitSince = {
  id: "01a06950-236c-700a-ae29-8d12d5d4a046",
  pageTypeSlug: "instant-property",
  slug: "step-dispatch-wait-since",
  propertySlug: "dispatch-wait-since",
  definition: "since when the step has been waiting to be dispatched",
} as const satisfies InstantProperty
