import type { ModulePropertyGroupCeilings } from "akasha/code/module-property-group/module-property-group.page-type.ts"
import type { ModulePropertyGroup } from "akasha/code/module-property-group/module-property-group.page-type.types.ts"

export type OnComplete = ModulePropertyGroupCeilings

export const onComplete = {
  id: "01a12094-d095-773d-92d5-a08df195c615",
  type: "page-type/module-property-group",
  slug: "on-complete",
  propertySlug: "on-complete",
  definition: "the code run once a to-do is completed",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The code exports one function, handed the to-do's slug, its values and the instant it was completed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A to-do completed from the app, the web or the command line runs the code alike.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing undoes what the code did when the to-do is no longer completed.",
    },
  ],
  createdAt: "2026-10-09T12:13:06.068Z",
  updatedAt: "2026-10-09T12:13:06.068Z",
} as const satisfies ModulePropertyGroup
