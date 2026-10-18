import type { ModulePropertyGroupCeilings } from "akasha/code/module-property-group/module-property-group.page-type.ts"
import type { ModulePropertyGroup } from "akasha/code/module-property-group/module-property-group.page-type.types.ts"

export type ExtensionSite = ModulePropertyGroupCeilings

export const extensionSite = {
  id: "01a15003-5b26-74b3-ada4-69ba46c1c3fc",
  type: "page-type/module-property-group",
  slug: "extension-site",
  propertySlug: "site",
  definition: "the code a browser extension runs inside the pages its manifest matches",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The site code exports the function each matched page starts it with.",
    },
  ],
  createdAt: "2026-10-18T17:15:59.652Z",
  updatedAt: "2026-10-18T17:15:59.652Z",
} as const satisfies ModulePropertyGroup
