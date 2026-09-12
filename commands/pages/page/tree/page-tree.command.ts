import type { Command } from "akasha/commands/command.page-type.types.ts"

export const pageTree = {
  id: "01a06936-e303-7910-8ed1-f5ea8e762847",
  type: "command",
  slug: "page-tree",
  definition: "the command answering the page type and property rows a page tree is assembled from",
  code: "ts",
  test: "ts",
  taking: [],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The whole answer is one JSON object carrying `types`, `properties` and `propertyTypes`.",
    },
    {
      invariantKind: "departure",
      statement: "A row is an `at` and a `values`.",
    },
    {
      invariantKind: "departure",
      statement: "A page type is answered with the properties that page type declares.",
    },
    {
      invariantKind: "departure",
      statement: "A property page is answered under the kind of property that page is.",
    },
    {
      invariantKind: "departure",
      statement: "A property carrying properties of its own is answered with those properties too.",
    },
    {
      invariantKind: "departure",
      statement: "Every row is read from the index rather than from a page body.",
    },
    {
      invariantKind: "departure",
      statement: "An index that is not there refuses rather than falling back to a walk.",
    },
    {
      invariantKind: "departure",
      statement: "The three groups are handed back and the caller assembles the tree.",
    },
    {
      invariantKind: "departure",
      statement:
        "A property is named bare where that is unambiguous and `kind/slug` where the bare name is not.",
    },
    {
      invariantKind: "departure",
      statement: "A page type has `many` and `maxCount` and `required`.",
    },
    {
      invariantKind: "departure",
      statement: "The property page has the rest.",
    },
    {
      invariantKind: "departure",
      statement: "A declaration naming no property page refuses the whole answer.",
    },
    {
      invariantKind: "departure",
      statement:
        "A row names the checkout that row was read from ahead of the path inside that checkout.",
    },
    {
      invariantKind: "departure",
      statement: "The code answers as a file run on its own as well as through the index.",
    },
    {
      invariantKind: "absence",
      statement: "No group of domain rows is answered.",
    },
    {
      invariantKind: "absence",
      statement: "A run writes nothing.",
    },
  ],
  name: "tree",
} as const satisfies Command
