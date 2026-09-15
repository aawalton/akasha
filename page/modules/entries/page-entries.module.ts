import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageEntries = {
  id: "01a05fa9-de48-7998-bf7c-a433b344bba0",
  type: "module",
  slug: "page-entries",
  definition: "the values a page keeps one to a line in a file beside the page",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Reading a property's values back for a test is done here rather than by each test.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A property whose page type is `page-property-entry` keeps its values beside the page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A file's name is the page's name followed by the property's slug and the extension stated.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A blank line has no value.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A file the page names that is not there is refused rather than read as holding nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A line that is no JSON object is refused rather than left out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An empty file is answered with an empty list rather than refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The values read here are written over the extension the page states.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A property's values may be kept in the numbered files beside the page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The values of one property are read in the order the files are numbered.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The first file of a property not held uncommitted is refused where no file is there.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A property held uncommitted is read from the files whose names say so.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A property held uncommitted whose first file is not there holds no value.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Reading stops at the first numbered file that is not there.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A caller handing in how a body is read is answered from those bodies rather than off the disk.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body a caller hands in that holds no JSON object is passed over there.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A caller naming which properties it wants has the files of no other property read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller naming no properties has every entry property's files read.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads the index.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes.",
    },
  ],
} as const satisfies Module
