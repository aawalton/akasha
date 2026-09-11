import type { ModulePropertyGroupCeilings } from "akasha/code/module-property-groups/module-property-group.page-type.ts"
import type { ModulePropertyGroup } from "akasha/code/module-property-groups/module-property-group.page-type.types.ts"

export type Running = ModulePropertyGroupCeilings

export const running = {
  id: "01a0917c-bda7-752a-b5cf-3d8419423042",
  pageTypeSlug: "module-property-group",
  type: "module-property-group",
  slug: "running",
  propertySlug: "running",
  definition: "the code a workstation service runs",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A service that runs until stopped never answers from its run.",
    },
    {
      invariantKind: "departure",
      statement: "The code a service runs is reached by that service's slug rather than by a path.",
    },
  ],
} as const satisfies ModulePropertyGroup
