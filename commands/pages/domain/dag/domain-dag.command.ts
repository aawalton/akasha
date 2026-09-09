import type { Command } from "../../../command.page-type.ts"

export const domainDag = {
  id: "01a07c03-8a7b-7661-a70a-f3c561dbfe12",
  pageTypeSlug: "command",
  slug: "domain-dag",
  definition: "the command drawing the domain tree, each domain under the domain with it",
  code: "ts",
  test: "ts",
  changeKind: "change-none",
  parts: ["module/domain-drawing"],
  taking: [
    { said: "--domain <slug>", takes: "the domain to root the tree at instead of at its roots" },
    { said: "--up <slug>", takes: "the domain to draw ABOVE instead of below, up to the roots" },
    { said: "--paths", takes: "the file carrying each domain, drawn beside its slug" },
    { said: "--descent", takes: "every page type extending `domain` as well as `domain` itself" },
  ],
  helpNotes: [
    "a domain names the domains it holds in `parts`, as `domain/<slug>`, so an edge is read off the domain holding it rather than off the domain held.",
    "`--domain` and `--up` are each repeatable, and a slug carrying no domain page refuses the call by name.",
    "a domain held by several domains is drawn beneath each of them, that being what the edges say; the repeats are the graph rather than a fault in the drawing.",
    "a domain already open further up its own branch is drawn once and marked, so a cycle terminates rather than running away.",
    "a page of the `domain` page type is what is read by default, `module`, `command` and the other types extending `domain` being outside it.",
    "`--descent` widens the reading to every page type extending `domain`, which is the whole tree of code rather than the domains alone.",
    "the pages are read from the index, which carries what each page file declares and applies nothing of its own.",
  ],
  invariants: [
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
} as const satisfies Command
