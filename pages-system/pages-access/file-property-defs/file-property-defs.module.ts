import type { Module } from "@akasha/code-system/module"

export const filePropertyDefs = {
  id: "01a05bd6-c530-72bb-9046-ba72f58fad9b",
  pageTypeSlug: "module",
  slug: "file-property-defs",
  definition: "the property definitions a file-backed page type declares",
  code: "ts",
  invariants: [
    {
      invariantKind: "gap",
      statement: "Every question here refuses.",
    },
    {
      invariantKind: "absence",
      statement:
        "`@akasha/pages-system-service` answers no question about what a page type declares.",
    },
    {
      invariantKind: "departure",
      statement:
        "A refusal names `@akasha/pages-system/page-type-properties` as what reads properties off the index.",
    },
    {
      invariantKind: "absence",
      statement: "An empty list is never answered.",
    },
    {
      invariantKind: "absence",
      statement: "An empty list would read as a page type declaring no property.",
    },
    {
      invariantKind: "gap",
      statement: "These refusals are the only thing holding a read that crosses accounts.",
    },
    {
      invariantKind: "departure",
      statement: "Answering a shape here re-arms every narrow a stripped key had disarmed.",
    },
  ],
} as const satisfies Module
