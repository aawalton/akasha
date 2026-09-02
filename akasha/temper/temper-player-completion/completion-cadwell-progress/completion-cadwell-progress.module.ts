import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionCadwellProgress = {
  id: "01a06358-4f7c-7c27-bdbb-10ed9f4e7578",
  pageTypeSlug: "module",
  slug: "completion-cadwell-progress",
  definition:
    "how much of Cadwell's Almanac a character has finished, level by level and zone by zone",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The Cadwell catalog arrives as an argument rather than as an imported table.",
    },
    {
      invariantKind: "departure",
      statement: "A zone is the stops of a level sharing a zone index.",
    },
    {
      invariantKind: "departure",
      statement: "The order of the stops is the order the level states.",
    },
    {
      invariantKind: "departure",
      statement: "A zone takes its name from the first stop that names the zone.",
    },
    {
      invariantKind: "departure",
      statement: "A character never read is left out.",
    },
    {
      invariantKind: "constraint",
      statement: "An empty catalog answers an empty progress.",
    },
  ],
} as const satisfies Module
