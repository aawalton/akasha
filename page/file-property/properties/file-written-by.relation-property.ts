import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const fileWrittenBy = {
  id: "01a08e02-7592-7e87-a191-ee10ed3f6058",
  type: "page-type/relation-property",
  slug: "file-written-by",
  propertySlug: "written-by",
  definition: "the module property group whose code writes a property's file",
  targetPageType: "page-type/module-property-group",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A property naming a group has that group's code write the property's file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two properties never name one group.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A property naming no group says nothing about what writes the property's file.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-11T01:08:40.978Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies RelationProperty
