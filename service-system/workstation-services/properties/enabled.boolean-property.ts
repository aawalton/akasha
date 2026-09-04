import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type Enabled = boolean

export const enabled = {
  id: "01a05a3f-b42c-74ff-9a06-c83e54d1ff04",
  pageTypeSlug: "boolean-property",
  slug: "enabled",
  propertySlug: "enabled",
  definition: "whether a service is to be running",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A service stating false is installed and stopped rather than left uninstalled.",
    },
  ],
} as const satisfies BooleanProperty
