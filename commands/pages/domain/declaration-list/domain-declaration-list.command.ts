import type { Command } from "akasha/commands/command.page-type.types.ts"

export const domainDeclarationList = {
  id: "01a07c03-ab2b-79aa-bfa7-3e62543a4164",
  type: "command",
  slug: "domain-declaration-list",
  definition: "the command handing over every domain and persona page whole, as JSON",
  code: "ts",
  test: "ts",
  taking: [
    {
      said: "--subject <subject>",
      takes: "`domains` or `personas` alone, where both would be said",
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The pages are read from the index, which applies nothing of its own to what a page declares.",
    },
    {
      invariantKind: "departure",
      statement: "A subject that is neither domains nor personas is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming no subject is handed the domains and the personas.",
    },
    {
      invariantKind: "departure",
      statement: "A flag `domain declaration list` does not take is refused by name.",
    },
    {
      invariantKind: "departure",
      statement: "A subject with nothing refuses rather than answering empty.",
    },
    {
      invariantKind: "absence",
      statement: "A run writes nothing.",
    },
  ],
  name: "declaration-list",
} as const satisfies Command
