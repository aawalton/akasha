import type { Module } from "@akasha/code/module"

export const addressMapping = {
  id: "01a077d0-6448-771d-a561-565678d6c152",
  pageTypeSlug: "module",
  type: "module",
  slug: "address-mapping",
  definition: "writing the type that binds each change address to that change's own arguments",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A runner opts in by stating the property with the map.",
    },
    {
      invariantKind: "departure",
      statement: "The changes a map holds are the changes of the page type that runner names.",
    },
    {
      invariantKind: "departure",
      statement: "A runner naming no page type is left out rather than given every change.",
    },
    {
      invariantKind: "departure",
      statement: "The maps written again are the maps of the runners the index has.",
    },
    {
      invariantKind: "departure",
      statement: "A map whose runner the index has no page for is written again by nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A change exporting the run is reached by the map.",
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
      statement: "Every body is read through the change rather than off the disk.",
    },
    {
      invariantKind: "departure",
      statement: "What is written again is answered as a change rather than as a body.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file that is not there yet is answered as an addition rather than a replacement.",
    },
    {
      invariantKind: "departure",
      statement: "The map is worked out again only where the change could turn what the map holds.",
    },
    {
      invariantKind: "departure",
      statement:
        "What a change could turn is read from the names of the paths it has and the code beside them.",
    },
    {
      invariantKind: "departure",
      statement: "A guard that cannot tell works the map out rather than leaving the map stale.",
    },
    {
      invariantKind: "departure",
      statement: "A map already matching the body a landing would write is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "A map the change itself answers is left as that change wrote the map.",
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
      invariantKind: "departure",
      statement: "A shadow that will not cast is said rather than passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A page type extending the page type changes are filed under is reached too.",
    },
  ],
} as const satisfies Module
