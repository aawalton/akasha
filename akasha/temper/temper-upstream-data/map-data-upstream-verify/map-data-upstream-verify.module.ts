import type { Module } from "@akasha/code-system/module"

export const mapDataUpstreamVerify = {
  id: "01a06282-dfc3-7a2b-87b4-c262c2239e92",
  pageTypeSlug: "module",
  slug: "map-data-upstream-verify",
  definition: "the ruling on whether the ported LibMapData data still matches upstream",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The map table is ruled on.",
    },
    {
      invariantKind: "departure",
      statement: "The pseudo map indices are ruled on.",
    },
    {
      invariantKind: "departure",
      statement: "The pseudo map indices are gathered off the globals by a shared name prefix.",
    },
    {
      invariantKind: "departure",
      statement: "The map table is walked inside Lua.",
    },
    {
      invariantKind: "departure",
      statement: "The pseudo map indices are walked inside Lua.",
    },
    {
      invariantKind: "departure",
      statement: "The whole map table is ruled on rather than the map index sub-table alone.",
    },
    {
      invariantKind: "departure",
      statement: "The Lua machine is closed once the ruling settles.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a ported file.",
    },
  ],
} as const satisfies Module
