import type { Module } from "../../code-system/modules/module.page-type.ts"

export const inboxPass = {
  id: "01a06948-c4c6-798a-a36f-1d22dd231125",
  pageTypeSlug: "module",
  slug: "inbox-pass",
  definition: "one pass over a person's inbox, said in lines a reader can act on",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A pass names the person whose inbox it reads.",
    },
    {
      invariantKind: "departure",
      statement: "Naming no person reads Alan's inbox.",
    },
    {
      invariantKind: "departure",
      statement: "A flag standing where a person's name was asked for is no name.",
    },
    {
      invariantKind: "departure",
      statement: "A dry run decides everything and carries nothing out.",
    },
    {
      invariantKind: "departure",
      statement: "A run says in its closing line whether it was a dry run.",
    },
    {
      invariantKind: "departure",
      statement: "Every decision a run made is said before the tally.",
    },
    {
      invariantKind: "departure",
      statement:
        "A tally counts what was examined, what was acted on, what waits on an agent, and what no rule claimed.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says what a rule does to a message.",
    },
  ],
} as const satisfies Module
