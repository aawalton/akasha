import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const bundleFileScan = {
  id: "01a090a1-d412-774a-bbde-41fd710f05a3",
  type: "module",
  slug: "bundle-file-scan",
  definition: "an emitted bundle's text at a path, handed to a scanner along with that path",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A bundle is read as UTF-8.",
    },
    {
      invariantKind: "departure",
      statement: "The path a bundle was read from is the file name each finding carries.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges what a scanner found.",
    },
  ],
} as const satisfies Module
