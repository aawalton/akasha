import type { TextProperty } from "@akasha/pages-system/text-property"

export type UrlPath = string

export const urlPath = {
  id: "01a071dc-83c6-7c58-b6e1-8aaf847e66ef",
  pageTypeSlug: "text-property",
  slug: "url-path",
  propertySlug: "url-path",
  definition: "the path a router serves a route under",
  max: 100,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A path is written as the router takes it, with no leading slash.",
    },
    {
      invariantKind: "departure",
      statement: "A segment opening with `:` names a parameter rather than a literal.",
    },
    {
      invariantKind: "departure",
      statement: "A segment of `*` matches whatever is left of the url.",
    },
  ],
} as const satisfies TextProperty
