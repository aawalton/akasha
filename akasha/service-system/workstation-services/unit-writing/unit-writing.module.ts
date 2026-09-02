import type { Module } from "@akasha/code-system/module"

export const unitWriting = {
  id: "01a05a56-b9f1-77a4-8a3d-6e0424952002",
  pageTypeSlug: "module",
  slug: "unit-writing",
  definition: "the unit and timer text a workstation service's page states",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A unit is written from a page's value and the path that page stands at.",
    },
    {
      invariantKind: "departure",
      statement: "A service stating a schedule is written a timer beside its unit.",
    },
    {
      invariantKind: "departure",
      statement: "Only the timer of a scheduled service is installed.",
    },
    {
      invariantKind: "departure",
      statement: "A service stating no schedule is wanted by the default target.",
    },
    {
      invariantKind: "departure",
      statement: "A service stating no schedule is started again when the service stops.",
    },
    {
      invariantKind: "departure",
      statement: "A command naming a TypeScript file is run under the wrapper.",
    },
    {
      invariantKind: "departure",
      statement: "A scheduled service runs under no wrapper.",
    },
    {
      invariantKind: "departure",
      statement: "A command opening with a dash may fail without the unit failing.",
    },
    {
      invariantKind: "departure",
      statement: "A service stating it needs secrets is handed them by the shell its unit starts.",
    },
    {
      invariantKind: "departure",
      statement: "The exit the wrapper leaves on is the one systemd starts the service again for.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a file.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here runs systemctl.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here settles where a unit is installed.",
    },
    {
      invariantKind: "gap",
      statement: "Eleven of the seventeen options the services standing today state are written.",
    },
  ],
} as const satisfies Module
