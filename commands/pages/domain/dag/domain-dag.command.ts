import type { Command } from "akasha/commands/command.page-type.types.ts"

export const domainDag = {
  id: "01a07c03-8a7b-7661-a70a-f3c561dbfe12",
  type: "command",
  slug: "domain-dag",
  definition: "the command drawing the domain tree, each domain under the domain with it",
  code: "ts",
  test: "ts",
  parts: [],
  taking: [
    { said: "--descent", takes: "every page type extending `domain` as well as `domain` itself" },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "An edge is read off the `parts` of the domain holding it rather than off the domain held.",
    },
    {
      invariantKind: "departure",
      statement: "`--domain` and `--up` each repeat.",
    },
    {
      invariantKind: "departure",
      statement: "A slug carrying no domain page refuses the call by name.",
    },
    {
      invariantKind: "departure",
      statement: "A domain held by several domains is drawn beneath each of them.",
    },
    {
      invariantKind: "departure",
      statement: "A domain already open further up its own branch is drawn once and marked.",
    },
    {
      invariantKind: "departure",
      statement: "A page of the `domain` page type alone is read where `--descent` is not said.",
    },
    {
      invariantKind: "departure",
      statement:
        "The pages are read from the index, which applies nothing of its own to what a page declares.",
    },
    {
      invariantKind: "departure",
      statement: "A flag `domain dag` does not take is refused by name.",
    },
    {
      invariantKind: "departure",
      statement: "A flag wanting a word and handed no word is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A tree with nothing refuses rather than answering empty.",
    },
    {
      invariantKind: "absence",
      statement: "A run writes nothing.",
    },
  ],
  name: "dag",
  arguments: [
    { argument: "argument/root-domain" },
    { argument: "argument/up" },
    { argument: "argument/paths" },
  ],
} as const satisfies Command
