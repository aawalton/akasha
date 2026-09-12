import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperAddonResolve = {
  id: "01a0603c-c1cb-701c-8c07-d388419d9fed",
  type: "command",
  slug: "temper-addon-resolve",
  definition: "the command answering which addon a name reaches",
  code: "ts",
  test: "ts",
  changeKind: "change-none",
  taking: [
    {
      said: "<name>",
      takes: "the canonical name, flat directory leaf or nested parent domain to resolve",
    },
    { said: "--code-root <path>", takes: "the checkout the addons are discovered in" },
  ],

  invariants: [
    {
      invariantKind: "departure",
      statement: "One addon is reached by more than one name.",
    },
    {
      invariantKind: "departure",
      statement: "A name reaching no addon is refused by name.",
    },
    {
      invariantKind: "departure",
      statement: "The resolver's answer is checked against the roster before that answer is given.",
    },
    {
      invariantKind: "departure",
      statement: "A call with no name to resolve is refused.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the game folder.",
    },
  ],
  name: "resolve",
} as const satisfies Command
