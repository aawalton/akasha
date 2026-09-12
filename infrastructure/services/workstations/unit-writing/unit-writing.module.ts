import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const unitWriting = {
  id: "01a05a56-b9f1-77a4-8a3d-6e0424952002",
  type: "module",
  slug: "unit-writing",
  definition: "the unit and timer text a workstation service's page states",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A unit is written from a page's value and the path that page is at.",
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
      statement:
        "A service stating no schedule is wanted by the target that service states or by the default target.",
    },
    {
      invariantKind: "departure",
      statement: "A service stating no schedule is started again when the service stops.",
    },
    {
      invariantKind: "departure",
      statement: "A command opening with a dash may fail without the unit failing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A service stating that service needs secrets is handed those secrets by the shell its unit starts.",
    },
    {
      invariantKind: "departure",
      statement: "A service reaching here has its command lines settled already.",
    },
    {
      invariantKind: "departure",
      statement: "A service is put in the slice holding the work that ranks below Alan's apps.",
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
      invariantKind: "departure",
      statement: "Every option a service's page states reaches that service's unit or timer.",
    },
    {
      invariantKind: "departure",
      statement:
        "One exit means a service is leaving for code that moved rather than leaving because it failed.",
    },
    {
      invariantKind: "departure",
      statement: "That exit is named here, and every service stating no schedule recycles on it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A scheduled service recycles on nothing, its next tick reading the code as it is.",
    },
    {
      invariantKind: "departure",
      statement: "An exit code a service states joins that exit rather than replacing it.",
    },
  ],
} as const satisfies Module
