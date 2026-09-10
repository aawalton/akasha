import type { PageType } from "./types/page-type.page-type.types.ts"

export const page = {
  id: "01a049b9-856c-7090-bd14-5a916f574259",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "page",
  definition: "all that is kept about one thing",
  pluralSlug: "pages",
  extends: [],
  properties: [
    { pageProperty: "text-property/id", required: true, many: false },
    { pageProperty: "relation-property/page-type-slug", required: false, many: false },
    { pageProperty: "relation-property/page-page-type", required: false, many: false },
    { pageProperty: "text-property/slug", required: true, many: false },
    { pageProperty: "text-property/title", required: false, many: false },
    { pageProperty: "text-property/description", required: false, many: false },
    { pageProperty: "text-property/cover", required: false, many: false },
  ],
  parts: [
    "relation-property/page-page-type",
    "relation-property/page-type-slug",
    "text-property/cover",
    "text-property/description",
    "text-property/id",
    "text-property/slug",
    "text-property/title",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page is one TypeScript file.",
    },
    {
      invariantKind: "departure",
      statement: "A page is one exported object named for the page's slug.",
    },
    {
      invariantKind: "absence",
      statement: "A page has no body.",
    },
    {
      invariantKind: "absence",
      statement: "Every section is a property.",
    },
    {
      invariantKind: "departure",
      statement: "A page's identity is a uuid version 7.",
    },
    {
      invariantKind: "departure",
      statement: "A page's identity is unchanged when its path changes.",
    },
    {
      invariantKind: "departure",
      statement: "A page's identity is unchanged when its slug changes.",
    },
    {
      invariantKind: "departure",
      statement: "A page's identity is unchanged when its title changes.",
    },
    {
      invariantKind: "departure",
      statement: "Some page properties have their own files.",
    },
    {
      invariantKind: "departure",
      statement: "Some page property files are not TypeScript files.",
    },
    {
      invariantKind: "departure",
      statement: "A page is deleted once its purpose is done.",
    },
    {
      invariantKind: "stopgap",
      statement: "Loading a page's file declares that page's value and runs no code.",
    },
    {
      invariantKind: "gap",
      statement: "A page file that runs code beyond the value declaration does not land.",
    },
  ],
  types: "ts",
} as const satisfies PageType
