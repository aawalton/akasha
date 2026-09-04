import type { PageProperty } from "../page-types/page-properties/page-property.page-type.ts"
import type { PageType } from "../page-types/page-type.page-type.ts"
import type { Properties } from "../page-types/properties/properties.record-property.ts"

export type PagePropertyEntry = PageProperty & {
  properties: Properties
}

export const pagePropertyEntry = {
  id: "01a05f80-3969-7000-8ccd-6284909fc036",
  pageTypeSlug: "page-type",
  slug: "page-property-entry",
  definition: "a page property whose values are kept one to a line beside the page",
  pluralSlug: "page-property-entries",
  extendsSlug: ["page-type/page-property"],
  properties: [{ pagePropertySlug: "properties", required: true, many: true, max: null }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An entry is one value under a declaration rather than a page.",
    },
    {
      invariantKind: "departure",
      statement: "An entry shape names the fields every entry under that shape carries.",
    },
    {
      invariantKind: "departure",
      statement:
        "An entry is reached through the page that carries the entry rather than by a slug.",
    },
    {
      invariantKind: "departure",
      statement: "What a record property holds inline an entry shape holds in a file of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A page states this property as the extension the file beside the page carries.",
    },
    {
      invariantKind: "departure",
      statement: "Every entry is judged against the fields its shape declares.",
    },
    {
      invariantKind: "departure",
      statement: "Every entry carries an id.",
    },
    {
      invariantKind: "departure",
      statement: "An entry arriving without an id is given an id as the entry lands.",
    },
    {
      invariantKind: "departure",
      statement: "An entry's id is a uuid version 7 as a page's id is.",
    },
  ],
} as const satisfies PageType
