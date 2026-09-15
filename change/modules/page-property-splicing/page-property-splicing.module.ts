import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pagePropertySplicing = {
  id: "01a09c57-fd55-7dd2-8750-4e82ff215d07",
  type: "module",
  slug: "page-property-splicing",
  definition: "the edits writing a page's properties, their values and the records they hold",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "One page's edits are worked out over one reading of that page's body.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key put in lands after the key named, and last where no key is named.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key put in the place of another takes that other key's whole property.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key the page states already is refused rather than stated twice.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key the page states nowhere is dropped by nothing rather than refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A value put into a list falls after the values that list holds.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A value put in where the caller says the key is sorted falls in that order.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key the page states nowhere gains that value as its one value in a list.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A value the list holds already is refused rather than held twice.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key holding one value rather than a list is refused as a restatement.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The first of the values named that a list holds is the one that goes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A list holding none of the values named is refused by its key.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A record the list holds already is refused rather than held twice.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The record that goes is the one stating the text named under the field named.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key more than one record of which states that text is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key stating no record is refused rather than answered as no edit.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page exporting no object is refused by its path.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Edits touching one passage of a page come out as one edit over that passage.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One page refused refuses the whole run, and the refusal names that page.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads the index.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here says which pages are written.",
    },
  ],
} as const satisfies Module
