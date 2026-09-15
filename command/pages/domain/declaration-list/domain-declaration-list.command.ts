import type { Command } from "akasha/command/command.page-type.types.ts"

export const domainDeclarationList = {
  id: "01a07c03-ab2b-79aa-bfa7-3e62543a4164",
  type: "page-type/command",
  slug: "domain-declaration-list",
  definition: "the command handing over every domain and persona page whole, as JSON",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The pages are read from the index, which applies nothing of its own to what a page declares.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A subject that is neither domains nor personas is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call naming no subject is handed the domains and the personas.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A flag `domain declaration list` does not take is refused by name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A subject with nothing refuses rather than answering empty.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A run writes nothing.",
    },
  ],
  name: "declaration-list",
  arguments: [{ argument: "argument/declaration-subject", repeats: true }],
} as const satisfies Command
