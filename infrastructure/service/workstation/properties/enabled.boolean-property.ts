import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const enabled = {
  id: "01a05a3f-b42c-74ff-9a06-c83e54d1ff04",
  type: "page-type/boolean-property",
  slug: "enabled",
  propertySlug: "enabled",
  definition: "whether a service is to be running",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A service stating false is installed and stopped rather than left uninstalled.",
    },
  ],
  types: "ts",
} as const satisfies BooleanProperty
