import type { Module } from "@akasha/code/module"

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
      statement: "The declarers of a property are answered apart from the pages with the property.",
    },
    {
      invariantKind: "departure",
      statement: "A declarer is answered with the page type that declarer is.",
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
        "A property declared as a record's field is carried by the pages with that record.",
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
      statement: "A name no page property has is refused rather than answered with no pages.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file is beside a property naming that file where a page with that property sits in its folder.",
    },
    {
      invariantKind: "departure",
      statement: "A file in another folder is beside nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The file's name decides nothing on its own.",
    },
    {
      invariantKind: "departure",
      statement: "Which properties naming a file are meant is the caller's to say.",
    },
    {
      invariantKind: "departure",
      statement: "Every kind under a file property is read here, rather than that one kind.",
    },
    {
      invariantKind: "departure",
      statement:
        "Whether the file at a path is generated is answered here rather than by each caller.",
    },
    {
      invariantKind: "departure",
      statement:
        "A property naming no file says each file the property's section names is generated.",
    },
    {
      invariantKind: "departure",
      statement: "An index that cannot answer that is a file that is not generated.",
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
