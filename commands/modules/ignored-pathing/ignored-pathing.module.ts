import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const ignoredPathing = {
  id: "01a094ed-7d48-7ad0-b396-d7b51e9d3972",
  type: "module",
  slug: "ignored-pathing",
  definition: "the paths in a change the repository ignores rather than commits",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A change may have a path the repository ignores.",
    },
    {
      invariantKind: "departure",
      statement: "A path the repository ignores is parted from the paths a landing commits.",
    },
    {
      invariantKind: "departure",
      statement: "A path the repository ignores is written onto the tree rather than committed.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path the repository ignores that is taken away is renamed aside rather than unlinked.",
    },
    {
      invariantKind: "departure",
      statement:
        "A folder the repository ignores is taken away as a folder rather than renamed aside.",
    },
    {
      invariantKind: "departure",
      statement: "A path that is not there is renamed aside by nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A change the repository ignores no path of is parted by nothing.",
    },
    {
      invariantKind: "gap",
      statement:
        "A name renamed aside by a process that died before the unlink is taken away by nothing.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a body onto the tree.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here renames a path aside.",
    },
  ],
} as const satisfies Module
