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
      statement:
        "The pages of that page type and of every page type extending that page type are answered.",
    },
    {
      invariantKind: "departure",
      statement:
        "However far below the named page type a page type extends, that page type is reached.",
    },
    {
      invariantKind: "departure",
      statement: "A row carries the page type its own page states rather than the one named.",
    },
    {
      invariantKind: "departure",
      statement: "Those pages are read from the index.",
    },
    {
      invariantKind: "departure",
      statement: "A page type nothing extends that no page is filed under is answered empty.",
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
      statement:
        "The keys a page type declares are its own and those of every page type above that page type.",
    },
    {
      invariantKind: "departure",
      statement:
        "A key is the property slug a property page states rather than the slug reaching that page.",
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
      statement: "A calculation is worked out over every page answered.",
    },
    {
      invariantKind: "departure",
      statement: "A calculation over one page is the one that page's own page type declares.",
    },
    {
      invariantKind: "departure",
      statement: "A calculation is worked out before the tests narrow.",
    },
    {
      invariantKind: "departure",
      statement: "A calculation is worked out before the rows are ordered.",
    },
    {
      invariantKind: "departure",
      statement: "A key a calculation answers is answered as a stored key is.",
    },
    {
      invariantKind: "departure",
      statement: "A calculation answering absent puts no key in the row.",
    },
    {
      invariantKind: "departure",
      statement:
        "A calculation is read from the code file beside the page declaring that property.",
    },
    {
      invariantKind: "departure",
      statement: "A property whose code file is not there darkens that property's key alone.",
    },
    {
      invariantKind: "departure",
      statement: "A question naming a key a calculation refused is refused.",
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
      statement: "Rows are skipped before rows are taken.",
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
      statement: "The properties a page type declares are answered as its shape.",
    },
    {
      invariantKind: "departure",
      statement:
        "A shape names every property the page type and those above that page type declare.",
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
      invariantKind: "departure",
      statement:
        "A shape states the owner the nearest page type above the shape's own page type names.",
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
