import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const provision = {
  id: "01a0909f-9ea9-7dba-b8c0-27d20e677a97",
  type: "page-type/relation-property",
  slug: "provision",
  propertySlug: "provision",
  definition: "the script that builds a service's environment",
  targetPageType: "page-type/shell-script",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The folder that script sits in is the folder handed to the host.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two services provisioned the same way name one script.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The host runs that script with the service's name, its python and its folder.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
