import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperAddonResolve = {
  id: "01a0603c-c1cb-701c-8c07-d388419d9fed",
  type: "page-type/command",
  slug: "temper-addon-resolve",
  definition: "the command answering which addon a name reaches",
  code: "ts",
  test: "ts",

  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "One addon is reached by more than one name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name reaching no addon is refused by name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The resolver's answer is checked against the roster before that answer is given.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call with no name to resolve is refused.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads the game folder.",
    },
  ],
  name: "resolve",
  arguments: [
    { argument: "argument/code-root" },
    { argument: "argument/addon-name", required: true, saidAs: "word" },
  ],
} as const satisfies Command
