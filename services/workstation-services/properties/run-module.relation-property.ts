import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const runModule = {
  id: "01a08e05-72f7-7a28-b5c7-0e54c3d54c55",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "run-module",
  propertySlug: "module",
  definition: "the module whose code a command runs",
  targetPageType: "page-type/module",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A command names its module rather than spelling that module's path.",
    },
    {
      invariantKind: "departure",
      statement: "The file a command runs is the code file beside the module's page.",
    },
    {
      invariantKind: "departure",
      statement: "A module moving to another folder leaves the command naming that module whole.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
