import type { Module } from "@akasha/code/module"

export const addressMapping = {
  id: "01a077d0-6448-771d-a561-565678d6c152",
  pageTypeSlug: "module",
  slug: "address-mapping",
  definition: "writing the type that binds each change address to that change's own arguments",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A runner opts in by stating the property holding the map.",
    },
    {
      invariantKind: "departure",
      statement: "A mechanical change exporting the run is reached by the map.",
    },
    {
      invariantKind: "departure",
      statement: "A change exporting no run is left out rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "Whether a change exports the run is read from that change's code.",
    },
    {
      invariantKind: "departure",
      statement: "A body the landing rewrites is read through the shadow rather than off the disk.",
    },
    {
      invariantKind: "departure",
      statement: "The map is written again on every landing rather than when a change moves.",
    },
    {
      invariantKind: "departure",
      statement: "A map already matching the body a landing would write is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "The addresses come out sorted rather than in the order the index answers.",
    },
    {
      invariantKind: "departure",
      statement: "The map reads a change's arguments off that change's own signature.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here refuses a landing.",
    },
    {
      invariantKind: "gap",
      statement: "A generator that throws leaves a stale map for the typecheck to refuse.",
    },
    {
      invariantKind: "absence",
      statement: "No change a command line reaches is in the map.",
    },
    {
      invariantKind: "gap",
      statement: "The page type a change is filed under is named here rather than descended.",
    },
  ],
} as const satisfies Module
