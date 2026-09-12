import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const pageComposing = {
  id: "01a05de9-57a4-7810-8d1f-402752b1598b",
  type: "module",
  slug: "page-composing",
  definition: "the values a caller hands over, made into a page and what it keeps beside it",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
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
      statement: "A caller hands over no path.",
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
      statement: "A page the index already has is written back at the path the page has.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page the index does not have is placed under the folder its type is declared in.",
    },
    {
      invariantKind: "departure",
      statement: "A folder already named by the plural takes its pages under `pages`.",
    },
    {
      invariantKind: "departure",
      statement: "The folder a page type's pages sit in is answered here from that type alone.",
    },
    {
      invariantKind: "departure",
      statement: "A caller naming a page type that is no page is refused rather than guessed at.",
    },
    {
      invariantKind: "departure",
      statement: "A page type stating no plural is refused, because its pages have no folder.",
    },
    {
      invariantKind: "departure",
      statement: "A folder named by the plural with that opening taken off is named by it.",
    },
    {
      invariantKind: "departure",
      statement: "A folder not named by the plural takes its pages under the plural.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page whose type declares a property held beside the page takes a folder of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A page with no such file yet takes that folder too.",
    },
    {
      invariantKind: "departure",
      statement: "A property the root `page` type declares is no reason for a folder of its own.",
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
      statement: "A page has the page type the caller named.",
    },
    {
      invariantKind: "departure",
      statement: "A page names the file its type is written at where the page type states one.",
    },
    {
      invariantKind: "departure",
      statement: "A page states the page type the caller named under `type`.",
    },
    {
      invariantKind: "departure",
      statement: "That key is stated here rather than kept from the page.",
    },
    {
      invariantKind: "departure",
      statement: "A page has the slug the caller named.",
    },
    {
      invariantKind: "constraint",
      statement: "A slug past the hundred characters a page's slug holds is refused.",
    },
    {
      invariantKind: "departure",
      statement: "That slug is refused before the page type it names is looked for.",
    },
    {
      invariantKind: "departure",
      statement: "A slug past that length is refused rather than shortened.",
    },
    {
      invariantKind: "departure",
      statement: "A page the index already has keeps the identity the page has.",
    },
    {
      invariantKind: "departure",
      statement: "A caller may write its values over the values the page already has.",
    },
    {
      invariantKind: "departure",
      statement: "A key the caller does not name is kept from the page rather than dropped.",
    },
    {
      invariantKind: "departure",
      statement:
        "A caller stating `merge` composes its body from the value the page already holds.",
    },
    {
      invariantKind: "departure",
      statement:
        "A body composed that way holds whatever moved under it since that value was read.",
    },
    {
      invariantKind: "departure",
      statement: "`merge` is what marks a caller that reads a body and writes that body again.",
    },
    {
      invariantKind: "departure",
      statement: "A value held in a file beside the page is kept as the extension the page states.",
    },
    {
      invariantKind: "departure",
      statement:
        "A value under a file property names that file's ending rather than that file's body.",
    },
    {
      invariantKind: "departure",
      statement: "A caller may hand over the body a file property holds beside its ending.",
    },
    {
      invariantKind: "departure",
      statement: "That body is put at the file the ending names.",
    },
    {
      invariantKind: "departure",
      statement: "A body handed over for a key held in no file beside the page is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "A body handed over for a file named rather than placed beside the page is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A body handed over where nothing names the file's ending is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A value under an entry property is the rows themselves or that file's ending.",
    },
    {
      invariantKind: "departure",
      statement: "The files those rows fill are put alongside the page with those rows.",
    },
    {
      invariantKind: "departure",
      statement: "A numbered file those rows no longer fill is taken away.",
    },
    {
      invariantKind: "departure",
      statement: "A page naming no ending for its entries takes `jsonl`.",
    },
    {
      invariantKind: "departure",
      statement: "A value that cannot name a file's ending is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A merge into a page the index does not hold composes that page as a new page.",
    },
    {
      invariantKind: "absence",
      statement: "A caller states no identity for a page being created.",
    },
    {
      invariantKind: "departure",
      statement:
        "Several pages compose into the files a single write puts and keeps and takes away.",
    },
    {
      invariantKind: "departure",
      statement: "The page types a composing reads are read once for every page it composes.",
    },
    {
      invariantKind: "departure",
      statement: "A caller composing page by page may hand that reading in rather than paying it.",
    },
    {
      invariantKind: "departure",
      statement: "A caller handing none is answered from a reading made for that one page.",
    },
    {
      invariantKind: "departure",
      statement: "One page refused refuses the whole list.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a file.",
    },
    {
      invariantKind: "departure",
      statement:
        "A body composed for a page already there is that page's whole body written again.",
    },
    {
      invariantKind: "departure",
      statement: "The id the page already holds is carried into a body composed without `merge`.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here answers the body text a page held when the new body was composed.",
    },
    {
      invariantKind: "gap",
      statement: "A caller holds the body a page held when that caller's new body was composed.",
    },
  ],
} as const satisfies Module
