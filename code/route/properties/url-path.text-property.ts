import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const urlPath = {
  id: "01a071dc-83c6-7c58-b6e1-8aaf847e66ef",
  type: "text-property",
  slug: "url-path",
  propertySlug: "url-path",
  definition: "the path a router serves a route under",
  maxLength: 100,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path is written as the router takes that path.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path has no leading slash.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A segment opening with `:` names a parameter rather than a literal.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A segment of `*` matches whatever is left of the url.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
