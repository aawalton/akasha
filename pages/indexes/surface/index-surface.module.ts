import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const indexSurface = {
  id: "01a04f55-919c-7d2a-ab3d-8e6aca34022b",
  pageTypeSlug: "module",
  type: "module",
  slug: "index-surface",
  definition:
    "the three reads an index answers, and one reading laid over another so a change is read unwritten",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An index is read by three operations and no more operations.",
    },
    {
      invariantKind: "departure",
      statement: "One operation answers whether a path stands.",
    },
    {
      invariantKind: "departure",
      statement: "One operation answers the children a directory lists.",
    },
    {
      invariantKind: "departure",
      statement: "One operation answers the lines an entry file has.",
    },
    {
      invariantKind: "departure",
      statement: "An entry file is read off the disk each time it is asked for.",
    },
    {
      invariantKind: "absence",
      statement: "No reading holds the index it reads in memory.",
    },
    {
      invariantKind: "departure",
      statement: "A reader takes that surface rather than reaching for the disk.",
    },
    {
      invariantKind: "departure",
      statement: "The surface that reader reads can be something other than the committed index.",
    },
    {
      invariantKind: "departure",
      statement: "A reading laid over another reading has only the entry files a change touches.",
    },
    {
      invariantKind: "departure",
      statement:
        "A lay carries the lines that came and the lines that went rather than whole files.",
    },
    {
      invariantKind: "departure",
      statement: "A touched file's lines are worked out at the first ask and held for that lay.",
    },
    {
      invariantKind: "departure",
      statement: "A reading laid over a laid reading is laid over the reading beneath that one.",
    },
    {
      invariantKind: "departure",
      statement:
        "The entry files of both are one set, and the later act's lines are the ones read.",
    },
    {
      invariantKind: "absence",
      statement: "No reading is reached through another reading laid over the same one.",
    },
    {
      invariantKind: "departure",
      statement: "An entry file emptied by the change does not stand.",
    },
    {
      invariantKind: "departure",
      statement: "A directory left with nothing standing under that directory does not list.",
    },
    {
      invariantKind: "departure",
      statement:
        "An index emptied of every entry stands where the reading beneath that index stands.",
    },
    {
      invariantKind: "departure",
      statement: "A directory with no emptied path is listed straight through.",
    },
    {
      invariantKind: "departure",
      statement: "An index not there yet is read as an index that is there and has nothing.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a page body.",
    },
    {
      invariantKind: "departure",
      statement: "A reading laid over another leaves that one answering as it did.",
    },
    {
      invariantKind: "departure",
      statement: "A lay is worked out from the acts laid rather than from the acts laid before.",
    },
  ],
} as const satisfies Module
