import type { Index } from "akasha/page/index/index.page-type.types.ts"

export const indexShapes = {
  id: "01a0959c-17b7-7246-be02-06e9962e2adf",
  type: "index",
  slug: "index-shapes",
  definition: "an index from a page type to the shape of every page property of that page type",
  name: "shapes",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page property's own shape is filed under the page type that property is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page property is filed there whether or not any page type declares it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A shape filed there says what the property's own page says and nothing more.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every page property's shape is each of those files read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page stating no property slug is filed there nowhere.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing filed here says what a page type carries.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "What a page type carries is written beside that page type by a generator.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing filed here says which pages are of a page type.",
    },
  ],
} as const satisfies Index
