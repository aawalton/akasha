import type { Module } from "@akasha/code/module"

export const indexSettling = {
  id: "01a08c06-6aac-7a7a-be73-529b101223b1",
  pageTypeSlug: "module",
  type: "module",
  slug: "index-settling",
  definition: "the entries a change files and the reading that change leaves",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A settle answers the reading the change leaves beside the entries the change files.",
    },
    {
      invariantKind: "departure",
      statement: "Identity is settled for every page in a write before any relation is.",
    },
    {
      invariantKind: "departure",
      statement: "The value of every page in a write is settled before any relation is.",
    },
    {
      invariantKind: "departure",
      statement: "A relation naming a page of a page type the write has reaches that page type.",
    },
    {
      invariantKind: "departure",
      statement: "A body a file property has is never loaded.",
    },
    {
      invariantKind: "departure",
      statement: "A body that will not load is reported only for a page.",
    },
    {
      invariantKind: "departure",
      statement: "A settle reads an index that is nowhere yet as an index filing nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which properties have a `unique` is read from the schema as the change leaves the schema.",
    },
    {
      invariantKind: "departure",
      statement:
        "A change turning a property's `unique` on or off files that property for every page there.",
    },
    {
      invariantKind: "departure",
      statement:
        "A change turning which files a page type has files every page already of that page type.",
    },
    {
      invariantKind: "departure",
      statement:
        "A change taking a page type's slug away withdraws every page already of that page type.",
    },
    {
      invariantKind: "departure",
      statement:
        "The paths a change withdraws are read against the files the page types had before the change.",
    },
    {
      invariantKind: "departure",
      statement: "The entries a change withdraws are read against the world before the change.",
    },
    {
      invariantKind: "departure",
      statement: "The entries a change files are read against the world the change leaves.",
    },
    {
      invariantKind: "departure",
      statement: "A name the withdrawal cannot resolve is reported rather than passed over.",
    },
    {
      invariantKind: "departure",
      statement: "An edge is withdrawn against where its specifier landed before the change.",
    },
    {
      invariantKind: "departure",
      statement: "The import filing covers importers the change does not carry.",
    },
    {
      invariantKind: "gap",
      statement: "A page the index cannot read is reported rather than answered as empty.",
    },
    {
      invariantKind: "departure",
      statement:
        "An importer reread is read as the change leaves that importer rather than off the disk.",
    },
  ],
} as const satisfies Module
