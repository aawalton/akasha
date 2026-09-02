import type { FolderShape } from "../folder-shape.page-type.ts"

export const propertyPagesOnly = {
  id: "01a04e70-3e92-796f-b5e9-ce47ee249c71",
  pageTypeSlug: "folder-shape",
  slug: "property-pages-only",
  definition: "the shape of a folder holding property pages and nothing else",
  code: "ts",
  test: "ts",
  enabled: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The folder is named `properties`.",
    },
    {
      invariantKind: "departure",
      statement: "The name is judged before what the folder holds is judged.",
    },
    {
      invariantKind: "departure",
      statement: "A folder holding no file of its own takes the shape under that name.",
    },
    {
      invariantKind: "departure",
      statement: "A page is a property where `page-property` is anywhere above its page type.",
    },
    {
      invariantKind: "departure",
      statement: "A property page's page type says what kind of value that property page carries.",
    },
    {
      invariantKind: "departure",
      statement:
        "The pages here are of several types and that is the shape rather than a fault in it.",
    },
    {
      invariantKind: "absence",
      statement: "Which page the pages here are properties of is not judged here.",
    },
    {
      invariantKind: "absence",
      statement: "The folder above says which page these are properties of.",
    },
  ],
} as const satisfies FolderShape
