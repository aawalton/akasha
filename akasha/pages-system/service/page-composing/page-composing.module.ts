import type { Module } from "@akasha/code-system/module"

export const pageComposing = {
  id: "01a05de9-57a4-7810-8d1f-402752b1598b",
  pageTypeSlug: "module",
  slug: "page-composing",
  definition: "the values a caller hands over, made into a page and what it keeps beside it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A caller hands over a page type.",
    },
    {
      invariantKind: "departure",
      statement: "A caller hands over a slug.",
    },
    {
      invariantKind: "departure",
      statement: "A caller hands over values.",
    },
    {
      invariantKind: "absence",
      statement: "A caller hands over no path and no body.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which values are committed is read from the page type rather than from the caller.",
    },
    {
      invariantKind: "departure",
      statement: "A property the page type declares as uncommitted is kept beside the page.",
    },
    {
      invariantKind: "departure",
      statement: "Every other property is written into the page.",
    },
    {
      invariantKind: "departure",
      statement: "The keys are written in the order the keys are declared.",
    },
    {
      invariantKind: "departure",
      statement: "The type deepest in the descent declares first.",
    },
    {
      invariantKind: "departure",
      statement: "A page the index already holds is written back at the path the page has.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page the index does not hold is placed under the folder its type is declared in.",
    },
    {
      invariantKind: "departure",
      statement: "A folder already named by the plural takes its pages under `pages`.",
    },
    {
      invariantKind: "departure",
      statement: "A folder not named by the plural takes its pages under the plural.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page whose type declares a property held in a file takes a folder of its own there.",
    },
    {
      invariantKind: "departure",
      statement: "A page carrying no such file yet takes that folder too.",
    },
    {
      invariantKind: "departure",
      statement:
        "That folder is the page's slug with the name above the folder taken off the front.",
    },
    {
      invariantKind: "departure",
      statement: "Which properties are held in a file is read from the index.",
    },
    {
      invariantKind: "departure",
      statement: "A value under a key the page type declares no property for is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A value under a property the page type declares secret is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A page the index already holds keeps the identity the page has.",
    },
    {
      invariantKind: "departure",
      statement: "A caller may write its values over the values the page already carries.",
    },
    {
      invariantKind: "departure",
      statement: "A key the caller does not name is kept from the page rather than dropped.",
    },
    {
      invariantKind: "departure",
      statement: "A value held in a file beside the page is kept as the extension the page states.",
    },
    {
      invariantKind: "departure",
      statement: "A merge into a page the index does not hold composes that page as a new one.",
    },
    {
      invariantKind: "absence",
      statement: "A caller states no identity for a page being created.",
    },
    {
      invariantKind: "departure",
      statement: "Several pages compose into what one write puts and what the write keeps.",
    },
    {
      invariantKind: "departure",
      statement: "One page refused refuses the whole list.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a file.",
    },
  ],
} as const satisfies Module
