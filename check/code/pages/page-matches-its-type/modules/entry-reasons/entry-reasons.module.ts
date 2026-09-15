import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const entryReasons = {
  id: "01a077f1-476a-7f87-bc33-22c26c2fc750",
  type: "module",
  slug: "entry-reasons",
  definition: "the reasons the fields of a record and of an entry give against what declares them",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A record's fields are judged against the record property that declares those fields.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An entry beside the page is judged against the fields its property declares.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The fields of a group are the members that group's page type declares.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A member the group holds in a file is no field of the group.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A value that is no plain object has no field.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A field whose property declares fields is opened against what declares them.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Such a field holding what is no record gives a reason rather than being passed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A property keeping its values beside the page declares no record here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A property whose page type is under `page-property-entry` keeps its values beside the page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A field whose property names members is opened against the members it names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The one member declaring fields is what a record among them is judged against.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A value is passed over where a member of that property declares no field.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A property whose members declare fields more than once holds each of them.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A record among those members is judged against the one member its fields fit.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A record fits a member declaring every key that record states.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A record fits a member only where it states every key that member requires.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A record fitting no one member gives a reason rather than being passed over.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No value a record states picks the member that record is judged against.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The fields a declaration opens are read through the reader the caller hands in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A numbered entry file beside the page is judged as the first file is judged.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An entry file is read once rather than looked for and then read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A field the shape requires and the row leaves out gives a reason.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A field the shape keeps elsewhere or fixes or works out is not asked for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An entry's own id is not judged as a field of the shape declaring the entry.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An entry with no id refuses the page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An entry file that will not read refuses the page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The rows of one entry file are judged before the next file is read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file that will not read leaves the rows judged before it giving no reason.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file that will not read leaves the files after it unread.",
    },
  ],
} as const satisfies Module
