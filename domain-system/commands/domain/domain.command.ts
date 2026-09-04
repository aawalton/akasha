import type { Command } from "@akasha/command-system/command"

export const domain = {
  id: "01a06888-ab2d-7350-8540-b1eb2fcaa3f5",
  pageTypeSlug: "command",
  slug: "domain",
  definition: "the command saying which domains there are and how they sit inside each other",
  code: "ts",
  test: "ts",
  changeKindSlug: "change-none",
  taking: [
    {
      said: "dag",
      takes: "the act, which is the domain tree, each domain under the domain holding that domain",
    },
    {
      said: "declarations",
      takes: "the act, which is every domain and persona page whole, as JSON",
    },
    { said: "--domain <slug>", takes: "the domain to root the tree at instead of at its roots" },
    { said: "--up <slug>", takes: "the domain to print ABOVE instead of below, up to the roots" },
    { said: "--paths", takes: "the file carrying each domain, printed beside its slug" },
    { said: "--descent", takes: "every page type extending `domain` as well as `domain` itself" },
    {
      said: "--subject <subject>",
      takes: "`domains` or `personas` alone, where both would be said",
    },
  ],
  helpNotes: [
    "the act is the first word, and one call names one act.",
    "a domain names the domains it holds in `partSlugs`, as `domain/<slug>`, so an edge is read off the domain holding it rather than off the domain held.",
    "`--domain` and `--up` are each repeatable, and a slug carrying no domain page refuses the call by name.",
    "a domain held by several domains is printed beneath each of them, that being what the edges say; the repeats are the graph rather than a fault in the printing.",
    "a domain already open further up its own branch is printed once and marked, so a cycle terminates rather than running away.",
    "a page of the `domain` page type is what is read by default, `module`, `command` and the other 96 types extending `domain` being outside it.",
    "`--descent` widens the reading to every page type extending `domain`, which is the whole tree of code rather than the domains alone.",
    "`declarations` carries each page WHOLE, so a property the pages grow needs no flag here and no change at any caller.",
    "the pages are read from the index, which carries what each page file declares and applies nothing of its own.",
    "a subject holding nothing refuses the call rather than answering an empty list, an empty tree being a dead read.",
    "a run writes nothing.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The act is the first word.",
    },
    {
      invariantKind: "departure",
      statement: "One call names one act.",
    },
    {
      invariantKind: "departure",
      statement: "An act the command does not carry is refused rather than answered as nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A flag an act does not take is refused against that act by name.",
    },
    {
      invariantKind: "departure",
      statement: "A domain is a page of the `domain` page type rather than a page carrying a slug.",
    },
    {
      invariantKind: "departure",
      statement: "An edge is a `domain/<slug>` part named by the domain holding that part.",
    },
    {
      invariantKind: "departure",
      statement: "A root is a domain no domain names as a part.",
    },
    {
      invariantKind: "departure",
      statement: "A part naming no domain page is printed and marked rather than passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A slug named that carries no domain page refuses the call.",
    },
    {
      invariantKind: "departure",
      statement: "A tree or a subject holding nothing refuses rather than answering empty.",
    },
    {
      invariantKind: "departure",
      statement: "A page type names any number of types above it.",
    },
    {
      invariantKind: "departure",
      statement: "A page type is a kind of domain where any type it names above it is.",
    },
    {
      invariantKind: "departure",
      statement: "A domain open above the point being drawn is marked rather than drawn again.",
    },
    {
      invariantKind: "absence",
      statement: "A domain drawn elsewhere is no domain open above the point being drawn.",
    },
    {
      invariantKind: "absence",
      statement: "A run writes nothing.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a markdown document.",
    },
  ],
} as const satisfies Command
