import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type StepRemoteExecution = boolean

export const stepRemoteExecution = {
  id: "01a06950-236c-7cae-9069-b4c0b5f0014c",
  pageTypeSlug: "boolean-property",
  slug: "step-remote-execution",
  propertySlug: "remote-execution",
  definition: "whether the step's real work runs somewhere other than its own container",
} as const satisfies BooleanProperty
