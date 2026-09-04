import type { Module } from "@akasha/code-system/module"

export const pageAsking = {
  id: "01a05a07-81e2-7f5f-a79f-e899fbe6699b",
  pageTypeSlug: "module",
  slug: "page-asking",
  definition: "a question put to the pages, and the rows it answers with",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A question names one page type.",
    },
    {
      invariantKind: "departure",
      statement: "The pages of that type are read from the index.",
    },
    {
      invariantKind: "departure",
      statement: "A page type no page is filed under is answered empty.",
    },
    {
      invariantKind: "departure",
      statement: "A name that is no page type is refused rather than answered empty.",
    },
    {
      invariantKind: "departure",
      statement: "Whether a name is a page type is read from the index.",
    },
    {
      invariantKind: "departure",
      statement: "A test this module does not run is refused rather than dropped.",
    },
    {
      invariantKind: "departure",
      statement: "A test stating nothing is refused rather than narrowing nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The tests this runs are the ones `where-testing` names.",
    },
    {
      invariantKind: "departure",
      statement: "A key the page type declares nothing for is refused rather than left out.",
    },
    {
      invariantKind: "departure",
      statement: "A key is refused wherever a question names that key.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names the keys the page type does declare.",
    },
    {
      invariantKind: "departure",
      statement: "The keys a page type declares are its own and those of every page type above it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A key is what a property page states rather than the slug reaching that property page.",
    },
    {
      invariantKind: "departure",
      statement: "A row holds the keys the question names.",
    },
    {
      invariantKind: "departure",
      statement: "A question naming no key is answered with every key a page carries.",
    },
    {
      invariantKind: "departure",
      statement: "A key a page does not carry stands in no row.",
    },
    {
      invariantKind: "departure",
      statement:
        "A key the page type declares that no page carries is answered rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "A formula the page type declares is worked out over every page answered.",
    },
    {
      invariantKind: "departure",
      statement: "A figure is worked out before the tests narrow.",
    },
    {
      invariantKind: "departure",
      statement: "A figure is worked out before the rows are ordered.",
    },
    {
      invariantKind: "departure",
      statement: "A key a figure answers is answered as a stored key is.",
    },
    {
      invariantKind: "departure",
      statement: "A figure answering absent puts no key in the row.",
    },
    {
      invariantKind: "departure",
      statement: "A question naming a key no figure works out is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal over a figure names every key the same fault darkens.",
    },
    {
      invariantKind: "departure",
      statement: "A question naming no darkened key is answered without the darkened keys.",
    },
    {
      invariantKind: "departure",
      statement: "Rows are ordered by the key the question sorts on.",
    },
    {
      invariantKind: "departure",
      statement: "Rows are ordered by path where the question sorts on nothing.",
    },
    {
      invariantKind: "departure",
      statement: "What is skipped is skipped before what is taken is taken.",
    },
    {
      invariantKind: "departure",
      statement:
        "The values a page keeps outside the commit are read from the file beside that page.",
    },
    {
      invariantKind: "departure",
      statement: "The uncommitted values are written over the values the index carries.",
    },
    {
      invariantKind: "departure",
      statement: "The values a page keeps beside the page are read from the file the page names.",
    },
    {
      invariantKind: "departure",
      statement: "The values read beside the page are answered in place of the extension stated.",
    },
    {
      invariantKind: "departure",
      statement: "A file beside a page that will not read refuses the question.",
    },
    {
      invariantKind: "departure",
      statement: "What a page type declares is answered as its shape.",
    },
    {
      invariantKind: "departure",
      statement: "A shape names every property the page type and those above it declare.",
    },
    {
      invariantKind: "departure",
      statement: "A declaration is keyed as a page's file spells that key.",
    },
    {
      invariantKind: "departure",
      statement: "A declaration carries the property page's own definition.",
    },
    {
      invariantKind: "departure",
      statement: "A declaration carries the property page's own id.",
    },
    {
      invariantKind: "departure",
      statement: "A declaration carries the page type a property points at.",
    },
    {
      invariantKind: "departure",
      statement: "A name that is no page type is shaped as nothing rather than refused.",
    },
    {
      invariantKind: "absence",
      statement: "A shape states no owner.",
    },
    {
      invariantKind: "absence",
      statement: "No page's own file is opened.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here holds an answer for a later question.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes.",
    },
  ],
} as const satisfies Module
