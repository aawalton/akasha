import type { ModulePropertyGroupCeilings } from "akasha/code/module-property-group/module-property-group.page-type.ts"
import type { ModulePropertyGroup } from "akasha/code/module-property-group/module-property-group.page-type.types.ts"

export type ExtensionWorker = ModulePropertyGroupCeilings

export const extensionWorker = {
  id: "01a15003-5b26-7bf9-8851-70999813831d",
  type: "page-type/module-property-group",
  slug: "extension-worker",
  propertySlug: "worker",
  definition: "the code a browser extension runs apart from any page",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The worker exports the manifest and the function Chrome's worker starts with.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the worker reaches a site other than the page open.",
    },
  ],
  createdAt: "2026-10-18T17:15:59.652Z",
  updatedAt: "2026-10-18T17:15:59.652Z",
} as const satisfies ModulePropertyGroup
