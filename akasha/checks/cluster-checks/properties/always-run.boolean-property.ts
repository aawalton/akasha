import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type AlwaysRun = boolean

export const alwaysRun = {
  id: "01a0680b-1003-7fdc-b5a1-55a145129ebf",
  pageTypeSlug: "boolean-property",
  slug: "always-run",
  propertySlug: "always-run",
  definition: "whether a check runs on every change rather than on what woke it",
} as const satisfies BooleanProperty
