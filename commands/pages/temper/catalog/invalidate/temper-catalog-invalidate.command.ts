import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperCatalogInvalidate = {
  id: "01a0603c-c1cc-7794-96f8-1e11cbb069b9",
  type: "command",
  slug: "temper-catalog-invalidate",
  definition: "the command telling the catalog addon to collect the named domains again",
  code: "ts",
  taking: [{ said: "--all", takes: "collect every catalog domain again" }],
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
  ],
  name: "invalidate",
  arguments: [
    { argument: "argument/json" },
    { argument: "argument/side-file" },
    { argument: "argument/domain" },
  ],
} as const satisfies Command
