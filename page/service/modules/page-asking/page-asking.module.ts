import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageAsking = {
  id: "01a05a07-81e2-7f5f-a79f-e899fbe6699b",
  type: "module",
  slug: "page-asking",
  definition: "a question put to the pages, and the rows it answers with",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A question names one page type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The pages of that page type and of every page type extending that page type are answered.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A page type is reached however far below the named page type that page type extends.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A row has the page type its own page states rather than the page type named.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "That page type is a slug, however the page spells the address reaching that page type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A question tests and orders on that slug as a row carries it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Those pages are read from the index.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type nothing extends that no page is filed under is answered empty.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name that is no page type is refused rather than answered empty.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Whether a name is a page type is read from the index.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A test this module does not run is refused rather than dropped.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A test stating nothing is refused rather than narrowing nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The tests this runs are the ones `where-testing` names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key the page type declares nothing for is refused rather than left out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key is refused wherever a question names that key.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refusal names the keys the page type does declare.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A page type declares its own keys and the keys of every page type above that page type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A key is the property slug a property page states rather than the slug reaching that page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A row has the keys the question names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A question naming no key is answered with every key a page has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key a page does not have stands in no row.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A key the page type declares that no page carries is answered rather than refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A calculation the rows carry is worked out over every row a question answers.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A calculation over one page is the calculation that page's own page type declares.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A question testing or ordering on a calculated key works every calculation out first.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A question testing and ordering on no calculated key narrows before working any out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A question whose rows carry no calculated key works no calculation out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A calculation is worked out over the rows taken rather than over every row gathered.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A calculation reaches every page gathered however few rows are worked out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key a calculation answers is answered as a stored key is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A calculation answering absent puts no key in the row.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A calculation is read from the code file beside the page declaring that property.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A property whose code file is not there darkens that property's key alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A question naming a key a calculation refused is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A question naming no darkened key is answered without the darkened keys.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Rows are ordered by the key the question sorts on.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Rows are ordered by path where the question sorts on nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Rows are skipped before rows are taken.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An answer counts every page matching before any row is skipped or taken.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An answer is written out row by row and stops once past what it may carry.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The values a page keeps outside the commit are read from the file beside that page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The uncommitted values are written over the values the index has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The values a page keeps beside the page are read from the file the page names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The values read beside the page are answered in place of the extension stated.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file beside a page that will not read refuses the question.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The properties a page type declares are answered as its shape.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A shape names every property the page type and the page types above that page type declare.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A declaration is keyed as a page's file spells that key.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A declaration is titled by its own property slug written in start case.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A declaration has the property page's own id.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A declaration has the page type a property points at.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A declaration has the values a select property states.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name that is no page type is shaped as nothing rather than refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A shape states the owner the nearest page type above the shape's own page type names.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No page's own file is opened.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here has an answer for a later question.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes.",
    },
  ],
} as const satisfies Module
