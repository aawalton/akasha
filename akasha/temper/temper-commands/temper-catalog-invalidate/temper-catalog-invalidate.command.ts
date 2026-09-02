import type { Command } from "@akasha/command-system/command"

export const temperCatalogInvalidate = {
  id: "01a0603c-c1cc-7794-96f8-1e11cbb069b9",
  pageTypeSlug: "command",
  slug: "temper-catalog-invalidate",
  definition: "the command telling the catalog addon to collect the named domains again",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "--domain <name>", takes: "a catalog domain to collect again, said once per domain" },
    { said: "--all", takes: "collect every catalog domain again" },
    { said: "--side-file <path>", takes: "the file the addon reads the request from" },
    { said: "--json", takes: "give the written request as JSON rather than as one line" },
  ],
  helpNotes: [
    "a domain is named or `--all` is said, never both.",
    "a domain the addon's registry does not hold is refused by name.",
    "the request is a version the addon compares against what it last saw, so the collection happens at the next reload.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A call naming one domain beside `--all` is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A domain the addon's registry does not hold is refused by name.",
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
} as const satisfies Command
