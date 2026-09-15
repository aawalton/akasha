import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const addonSourceFiles = {
  id: "01a062a8-e76a-7fda-a7db-9dcb0cf64d2f",
  type: "module",
  slug: "addon-source-files",
  definition: "which files under a game add-on's own folder are that add-on's source and markup",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/constraint",
      statement: "An add-on's own code is the module code beside the add-on's own pages.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "An add-on still outside akasha keeps its code under a `src` folder.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A machine-written file is the add-on's own wherever the file sits.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A machine-written file counts even where a scan declines to read the file.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A type declaration is no code.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A test is no code.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A file a build wrote is a copy of a file already counted.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A file another package owns is no part of the add-on.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Five checks each had a reading of their own before this module.",
    },
  ],
} as const satisfies Module
