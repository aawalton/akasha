import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const urlPath = {
  id: "01a071dc-83c6-7c58-b6e1-8aaf847e66ef",
  type: "page-type/text-property",
  slug: "url-path",
  propertySlug: "url-path",
  definition: "a route's path",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A path is written as the router takes that path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path has no leading slash.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A segment opening with `:` names a parameter rather than a literal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A segment of `*` matches whatever is left of the url.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
