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
  createdAt: "2026-08-31T23:55:19.468Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies BooleanProperty
