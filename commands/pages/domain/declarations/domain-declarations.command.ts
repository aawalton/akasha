import type { Command } from "../../../command.page-type.ts"

export const domainDeclarations = {
  id: "01a07c03-ab2b-79aa-bfa7-3e62543a4164",
  pageTypeSlug: "command",
  type: "command",
  slug: "domain-declarations",
  definition: "the command handing over every domain and persona page whole, as JSON",
  code: "ts",
  test: "ts",
  changeKind: "change-none",
  taking: [
    {
      said: "--subject <subject>",
      takes: "`domains` or `personas` alone, where both would be said",
    },
  ],
  helpNotes: [
    "it carries each page WHOLE, so a property the pages grow needs no flag here and no change at any caller.",
    "the pages are read from the index, which carries what each page file declares and applies nothing of its own.",
    "a subject holding nothing refuses the call rather than answering an empty list, an empty tree being a dead read.",
  ],
  invariants: [
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
      statement: "A flag `domain declarations` does not take is refused by name.",
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
} as const satisfies Command
