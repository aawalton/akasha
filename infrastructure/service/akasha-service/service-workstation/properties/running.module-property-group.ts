import type { ModulePropertyGroupCeilings } from "akasha/code/module-property-group/module-property-group.page-type.ts"
import type { ModulePropertyGroup } from "akasha/code/module-property-group/module-property-group.page-type.types.ts"

export type Running = ModulePropertyGroupCeilings

export const running = {
  id: "01a0917c-bda7-752a-b5cf-3d8419423042",
  type: "page-type/module-property-group",
  slug: "running",
  propertySlug: "running",
  definition: "the code a workstation service runs",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A service that runs until stopped never answers from its run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The code a service runs is reached by that service's slug rather than by a path.",
    },
  ],
  createdAt: "2026-09-11T17:21:06.471Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies ModulePropertyGroup
