import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const personaRoutingRun = {
  id: "01a0a145-492c-7088-9b18-a9912de34fe6",
  type: "module",
  slug: "persona-routing-run",
  definition: "the run putting a zone's routing rules back in step with the persona pages",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here takes a routing rule away or turns one off.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A dry run answers its plan before any rule is written.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run is dry unless the caller asks for the writing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A second run over a zone the first run wrote to writes nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each address is named as soon as the rule routing it is written.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A run hands the list it was handed down, so a run that threw names what it routed first.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A write refused is carried out rather than caught and counted as done.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The destination is worked out from the rules read rather than handed to the run.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The addresses to route are read off the persona pages in the checkout.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The zone is named once here, as both the domain filtered on and the zone read.",
    },
  ],
} as const satisfies Module
