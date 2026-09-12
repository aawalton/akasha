import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const serviceReading = {
  id: "01a05a64-6ba1-7aaa-847b-316b27475e49",
  type: "module",
  slug: "service-reading",
  definition: "the workstation service a page states, read from the index and the page",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A reading naming no slug reaches every service.",
    },
    {
      invariantKind: "departure",
      statement: "A slug no page is filed under is refused by name.",
    },
    {
      invariantKind: "departure",
      statement: "A page that will not load refuses rather than reading as no service.",
    },
    {
      invariantKind: "departure",
      statement: "A page missing a value a service needs refuses rather than reading as a service.",
    },
    {
      invariantKind: "departure",
      statement: "One page that refuses refuses the whole reading.",
    },
    {
      invariantKind: "departure",
      statement: "A value stated as the wrong sort is read as though the value were not stated.",
    },
    {
      invariantKind: "departure",
      statement: "An option this system does not have is dropped rather than carried through.",
    },
    {
      invariantKind: "departure",
      statement: "A service has one command line, which runs the runner and names that service.",
    },
    {
      invariantKind: "departure",
      statement: "The command line is composed the same way for every service.",
    },
    {
      invariantKind: "departure",
      statement: "A service is named there by its slug rather than by the file holding its code.",
    },
    {
      invariantKind: "absence",
      statement: "What a page spells of how it runs reaches no command line.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a unit.",
    },
  ],
} as const satisfies Module
