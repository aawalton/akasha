import type { TextProperty } from "@akasha/pages-system/text-property"

export type StepDispatchWaitNode = string

export const stepDispatchWaitNode = {
  id: "01a06950-236c-7bc7-b5e1-f688ba9e9ce5",
  pageTypeSlug: "text-property",
  slug: "step-dispatch-wait-node",
  propertySlug: "dispatch-wait-node",
  definition: "the machine the step is waiting on",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
