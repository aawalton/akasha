import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const landingFinishing = {
  id: "01a094e6-a05f-7213-aac0-264169fdd44c",
  type: "module",
  slug: "landing-finishing",
  definition: "the work a landing does once its commit has landed",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The folders are cleared before any link is placed.",
    },
    {
      invariantKind: "departure",
      statement: "The units are kept after the links are placed.",
    },
    {
      invariantKind: "departure",
      statement:
        "A folder left with nothing by a path the repository ignores is cleared off the disk.",
    },
    {
      invariantKind: "departure",
      statement: "A folder is linked for a page that moved rather than for every page there is.",
    },
    {
      invariantKind: "departure",
      statement: "A page no move carries has the folder it sits in linked by nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A link that could not be placed is answered rather than refusing the landing.",
    },
    {
      invariantKind: "departure",
      statement: "A unit that could not be kept is answered rather than refusing the landing.",
    },
    {
      invariantKind: "departure",
      statement: "A landing that committed nothing is finished the same way.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here refuses a landing that has already committed.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a body the change carries.",
    },
  ],
} as const satisfies Module
