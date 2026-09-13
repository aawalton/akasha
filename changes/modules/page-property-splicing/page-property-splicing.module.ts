import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const pagePropertySplicing = {
  id: "01a09c57-fd55-7dd2-8750-4e82ff215d07",
  type: "module",
  slug: "page-property-splicing",
  definition:
    "the edits putting a key on a page, taking a key off it and restating one key as another",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One page's edits are worked out over one reading of that page's body.",
    },
    {
      invariantKind: "departure",
      statement: "A key put in lands after the key named, and last where no key is named.",
    },
    {
      invariantKind: "departure",
      statement: "A key put in the place of another takes that other key's whole property.",
    },
    {
      invariantKind: "departure",
      statement: "A key the page states already is refused rather than stated twice.",
    },
    {
      invariantKind: "departure",
      statement: "A key the page states nowhere is dropped by nothing rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "A page exporting no object is refused by its path.",
    },
    {
      invariantKind: "departure",
      statement: "Edits touching one passage of a page come out as one edit over that passage.",
    },
    {
      invariantKind: "departure",
      statement: "One page refused refuses the whole run, and the refusal names that page.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the index.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says which pages are written.",
    },
  ],
} as const satisfies Module
