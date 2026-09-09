import type { Module } from "@akasha/code/module"

export const entryReasons = {
  id: "01a077f1-476a-7f87-bc33-22c26c2fc750",
  pageTypeSlug: "module",
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
      statement: "A numbered entry file beside the page is judged as the first file is judged.",
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
  ],
} as const satisfies Module
