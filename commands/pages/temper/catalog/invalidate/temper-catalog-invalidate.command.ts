import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperCatalogInvalidate = {
  id: "01a0603c-c1cc-7794-96f8-1e11cbb069b9",
  type: "command",
  slug: "temper-catalog-invalidate",
  definition: "the command telling the catalog addon to collect the named domains again",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A call naming one domain beside `--all` is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming no domain and saying no `--all` is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A domain the addon's registry does not have is refused by name.",
    },
    {
      invariantKind: "departure",
      statement: "The request is a version number the addon weighs against the last version seen.",
    },
    {
      invariantKind: "departure",
      statement: "The collection happens when the game next reloads.",
    },
    {
      invariantKind: "departure",
      statement: "A folder this made where the game reads addons is named as soon as it is made.",
    },
    {
      invariantKind: "departure",
      statement: "A write that threw names that folder in its refusal.",
    },
    {
      invariantKind: "departure",
      statement: "A call that made no folder says nothing about one.",
    },
    {
      invariantKind: "departure",
      statement: "The writing of the request is handed in.",
    },
  ],
  name: "invalidate",
  arguments: [
    { argument: "argument/json" },
    { argument: "argument/side-file" },
    { argument: "argument/all", notWith: ["argument/domain"], oneOf: ["argument/domain"] },
    { argument: "argument/domain", repeats: true },
  ],
} as const satisfies Command
