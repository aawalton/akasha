import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const fileWrittenBy = {
  id: "01a08e02-7592-7e87-a191-ee10ed3f6058",
  type: "relation-property",
  slug: "file-written-by",
  propertySlug: "written-by",
  definition: "the module property group whose code writes a property's file",
  targetPageType: "page-type/module-property-group",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A property naming a group has that group's code write the property's file.",
    },
    {
      invariantKind: "departure",
      statement: "Two properties never name one group.",
    },
    {
      invariantKind: "departure",
      statement: "A property naming no group says nothing about what writes the property's file.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
