import type { Index } from "akasha/pages/indexes/index.page-type.types.ts"

export const indexShapes = {
  id: "01a0959c-17b7-7246-be02-06e9962e2adf",
  type: "index",
  slug: "index-shapes",
  definition: "an index from a page type to the shape of what it carries and of what it is",
  name: "shapes",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A shape file is found by the page type whose properties that file has.",
    },
    {
      invariantKind: "departure",
      statement: "A file has one line for each property that page type carries.",
    },
    {
      invariantKind: "departure",
      statement: "What a page type carries is filed apart from what a page property is.",
    },
    {
      invariantKind: "departure",
      statement: "A page property's own shape is filed under the page type that property is.",
    },
    {
      invariantKind: "departure",
      statement: "A page property is filed there whether or not any page type declares it.",
    },
    {
      invariantKind: "departure",
      statement: "A shape filed there says what the property's own page says and nothing more.",
    },
    {
      invariantKind: "departure",
      statement: "Every page property's shape is each of those files read.",
    },
    {
      invariantKind: "departure",
      statement: "A page stating no property slug is filed there nowhere.",
    },
    {
      invariantKind: "departure",
      statement: "A page type carries what it declares and what every page type above it declares.",
    },
    {
      invariantKind: "departure",
      statement: "A line carries the property worked out whole, so a reader reads no second page.",
    },
    {
      invariantKind: "departure",
      statement: "What a page type carries is one file read however many properties it has.",
    },
    {
      invariantKind: "departure",
      statement: "A property is filed under every page type carrying that property.",
    },
    {
      invariantKind: "departure",
      statement: "A property that changes refiles every page type carrying that property.",
    },
    {
      invariantKind: "departure",
      statement: "A page type that changes refiles every page type extending that page type.",
    },
    {
      invariantKind: "absence",
      statement: "A page type carrying no property has no file.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing filed here says which pages are of a page type.",
    },
  ],
} as const satisfies Index
