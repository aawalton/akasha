import type { Command } from "../../command-system/commands/command.page-type.ts"

export const pageTree = {
  id: "01a06936-e303-7910-8ed1-f5ea8e762847",
  pageTypeSlug: "command",
  slug: "page-tree",
  definition: "the index answers a page tree is composed from",
  code: "ts",
  test: "ts",
  changeKindSlug: "change-none",
  taking: [],
  helpNotes: [
    "one JSON object is printed and nothing else, carrying `types`, `properties` and `propertyTypes`.",
    "a row is `at` and `values`, and whoever asked assembles the tree, which keeps the assembling in one place rather than in two runtimes.",
    "every row comes out of the index, so this opens 14 files and parses no page body.",
    "an index that is not there refuses, because a walk kept as a fallback is a walk that runs.",
    "each page type is drawn with the properties that page type declares.",
    "each property page is drawn under the kind of property it is.",
    "a property carrying properties of its own holds those beneath it in the second tree.",
    "a property is named bare where that is unambiguous and `kind/slug` where it is not.",
    "a declaration naming no property page refuses the whole answer rather than dropping that row.",
    "no group of domain rows is answered, because a kind is a page type and `types` already carries its path.",
  ],
  invariants: [
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
      statement: "The three groups are handed back and whoever asked assembles the tree.",
    },
    {
      invariantKind: "departure",
      statement:
        "A property is named bare where that is unambiguous and `kind/slug` where it is not.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page type holds `many`, `max` and `required` and the property page holds the rest.",
    },
    {
      invariantKind: "departure",
      statement: "A declaration naming no property page refuses the whole answer.",
    },
    {
      invariantKind: "departure",
      statement: "A row names the checkout it was read from ahead of the path inside it.",
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
} as const satisfies Command
