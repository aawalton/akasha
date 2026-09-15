import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const unitWriting = {
  id: "01a05a56-b9f1-77a4-8a3d-6e0424952002",
  type: "module",
  slug: "unit-writing",
  definition: "the unit and timer text a workstation service's page states",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A unit is written from a page's value and the path that page is at.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A service stating a schedule is written a timer beside its unit.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only the timer of a scheduled service is installed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A service stating no schedule is wanted by the target that service states or by the default target.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A service stating no schedule is started again when the service stops.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A command that fails fails the unit.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A service stating that service needs secrets is handed those secrets by the shell its unit starts.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A service that cannot read those secrets leaves rather than starting without them.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The exit that leaving is is not one the unit counts as a success.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A service leaving on that exit is not started again, since nothing it does mends it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A service reaching here has its command lines settled already.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A service is put in the slice holding the work that ranks below Alan's apps.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a file.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here runs systemctl.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here settles where a unit is installed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every option a service's page states reaches that service's unit or timer.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "One exit means a service is leaving for code that moved rather than leaving because it failed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That exit is named here, and every service stating no schedule recycles on it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A scheduled service recycles on nothing, its next tick reading the code as it is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A unit ending on the signal that asks it to stop is a clean stop rather than a failure.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A scheduled service names that clean stop as a service stating no schedule does.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An exit code a service states joins that exit rather than replacing it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A unit the loader starts is ordered after the pages service and wants it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every unit runs its command in the checkout, so a bare specifier resolves there.",
    },
  ],
} as const satisfies Module
