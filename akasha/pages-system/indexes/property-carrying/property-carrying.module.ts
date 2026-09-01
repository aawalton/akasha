import type { Module } from "@akasha/code-system/module"

export const propertyCarrying = {
  id: "01a058d4-6546-7f65-8b92-9271477f905f",
  pageTypeSlug: "module",
  slug: "property-carrying",
  definition: "the pages a page property reaches, and the record each is reached through",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Which pages carry a property is one question asked here rather than composed by each caller.",
    },
    {
      invariantKind: "departure",
      statement: "A declaration is a relation.",
    },
    {
      invariantKind: "departure",
      statement: "Which page types declare a property is one read of the index.",
    },
    {
      invariantKind: "departure",
      statement: "What declares a property is answered apart from what carries the property.",
    },
    {
      invariantKind: "departure",
      statement: "A declarer is answered with the page type it is.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page type declaring a property carries the property to every type beneath that page type.",
    },
    {
      invariantKind: "departure",
      statement:
        "Descent is read from the reverse of `extends-slug` rather than from a page type's body.",
    },
    {
      invariantKind: "departure",
      statement:
        "A property declared as a record's field is carried by the pages carrying that record.",
    },
    {
      invariantKind: "departure",
      statement: "A field is answered with the record the field is reached through.",
    },
    {
      invariantKind: "departure",
      statement: "A property nested deeper than one record is not reached.",
    },
    {
      invariantKind: "departure",
      statement: "A name naming more than one page property is refused rather than chosen between.",
    },
    {
      invariantKind: "departure",
      statement: "A name no page property carries is refused rather than answered with no pages.",
    },
    {
      invariantKind: "absence",
      statement: "No page body is read.",
    },
    {
      invariantKind: "absence",
      statement: "Whether a page states the value is not answered here.",
    },
  ],
} as const satisfies Module
