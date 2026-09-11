import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const provision = {
  id: "01a0909f-9ea9-7dba-b8c0-27d20e677a97",
  type: "relation-property",
  slug: "provision",
  propertySlug: "provision",
  definition: "the script that builds the environment a service runs in",
  targetPageType: "page-type/shell-script",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The folder that script sits in is the folder handed to the host.",
    },
    {
      invariantKind: "departure",
      statement: "Two services provisioned the same way name one script.",
    },
    {
      invariantKind: "departure",
      statement: "The host runs that script with the service's name, its python and its folder.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
