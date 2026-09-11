import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const pagePropertyEntry = {
  id: "01a05f80-3969-7000-8ccd-6284909fc036",
  type: "page-type",
  slug: "page-property-entry",
  definition: "a page property whose values are kept one to a line beside the page",
  pluralSlug: "page-property-entries",
  extends: ["page-type/page-property"],
  properties: [
    { pageProperty: "one-of-property/properties", required: true, many: true, maxCount: null },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An entry is one value under a declaration rather than a page.",
    },
    {
      invariantKind: "departure",
      statement: "An entry shape names the fields every entry under that shape has.",
    },
    {
      invariantKind: "departure",
      statement: "An entry is reached through the page that has the entry rather than by a slug.",
    },
    {
      invariantKind: "departure",
      statement:
        "The values a record property holds inline an entry shape holds in a file of its own.",
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
      statement: "Every entry has an id.",
    },
    {
      invariantKind: "departure",
      statement: "An entry arriving without an id is given an id as the entry lands.",
    },
    {
      invariantKind: "departure",
      statement:
        "An entry arriving in a whole body is given that id by the change writing the body.",
    },
    {
      invariantKind: "gap",
      statement: "An entry appended to the file rather than written with it is given an id too.",
    },
    {
      invariantKind: "departure",
      statement: "An entry's id is a uuid version 7 as a page's id is.",
    },
  ],
  types: "ts",
} as const satisfies PageType
