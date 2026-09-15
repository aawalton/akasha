import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const serviceReading = {
  id: "01a05a64-6ba1-7aaa-847b-316b27475e49",
  type: "module",
  slug: "service-reading",
  definition: "the workstation service a page states, read from the index and the page",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reading naming no slug reaches every service.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A slug no page is filed under is refused by name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page that will not load refuses rather than reading as no service.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page missing a value a service needs refuses rather than reading as a service.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One page that refuses refuses the whole reading.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A value stated as the wrong sort is read as though the value were not stated.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Whether a service is told is read from that service's page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An option this system does not have is dropped rather than carried through.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A service has one command line, which runs the runner and names that service.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The command line is composed the same way for every service the loader is not named for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A service the loader is named for starts the loader and names itself to it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The tree a deploy pinned reaches no command line the loader composes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A service is named there by its slug rather than by the file holding its code.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The file that command line runs is answered for on its own as well.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "What a page spells of how it runs reaches no command line.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes a unit.",
    },
  ],
} as const satisfies Module
