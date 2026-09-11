import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

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
      invariantKind: "departure",
      statement:
        "A record's fields are judged against the record property that declares those fields.",
    },
    {
      invariantKind: "departure",
      statement: "An entry beside the page is judged against the fields its property declares.",
    },
    {
      invariantKind: "departure",
      statement: "The fields of a group are the members that group's page type declares.",
    },
    {
      invariantKind: "departure",
      statement: "A member the group holds in a file is no field of the group.",
    },
    {
      invariantKind: "departure",
      statement: "A value that is no plain object has no field.",
    },
    {
      invariantKind: "departure",
      statement: "A field whose property declares fields is opened against what declares them.",
    },
    {
      invariantKind: "departure",
      statement: "Such a field holding what is no record gives a reason rather than being passed.",
    },
    {
      invariantKind: "departure",
      statement: "A property keeping its values beside the page declares no record here.",
    },
    {
      invariantKind: "departure",
      statement: "A field whose property names members is opened against the members it names.",
    },
    {
      invariantKind: "departure",
      statement: "The one member declaring fields is what a record among them is judged against.",
    },
    {
      invariantKind: "departure",
      statement: "A value is passed over where a member of that property declares no field.",
    },
    {
      invariantKind: "departure",
      statement: "A property whose members declare fields more than once holds each of them.",
    },
    {
      invariantKind: "departure",
      statement: "A record among those members is judged against the one member its fields fit.",
    },
    {
      invariantKind: "departure",
      statement: "A record fits a member declaring every key that record states.",
    },
    {
      invariantKind: "departure",
      statement: "A record fits a member only where it states every key that member requires.",
    },
    {
      invariantKind: "departure",
      statement: "A record fitting no one member gives a reason rather than being passed over.",
    },
    {
      invariantKind: "absence",
      statement: "No value a record states picks the member that record is judged against.",
    },
    {
      invariantKind: "departure",
      statement: "The fields a declaration opens are read through the reader the caller hands in.",
    },
    {
      invariantKind: "departure",
      statement: "A numbered entry file beside the page is judged as the first file is judged.",
    },
    {
      invariantKind: "departure",
      statement: "An entry file is read once rather than looked for and then read.",
    },
    {
      invariantKind: "departure",
      statement: "A field the shape requires and the row leaves out gives a reason.",
    },
    {
      invariantKind: "departure",
      statement: "A field the shape keeps elsewhere or fixes or works out is not asked for.",
    },
    {
      invariantKind: "departure",
      statement: "An entry's own id is not judged as a field of the shape declaring the entry.",
    },
    {
      invariantKind: "departure",
      statement: "An entry with no id refuses the page.",
    },
    {
      invariantKind: "departure",
      statement: "An entry file that will not read refuses the page.",
    },
    {
      invariantKind: "departure",
      statement: "The rows of one entry file are judged before the next file is read.",
    },
    {
      invariantKind: "departure",
      statement: "A file that will not read leaves the rows judged before it giving no reason.",
    },
    {
      invariantKind: "departure",
      statement: "A file that will not read leaves the files after it unread.",
    },
  ],
} as const satisfies Module
