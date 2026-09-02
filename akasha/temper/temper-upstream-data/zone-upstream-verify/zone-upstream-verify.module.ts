import type { Module } from "@akasha/code-system/module"

export const zoneUpstreamVerify = {
  id: "01a06288-c640-74b3-b566-c847f9efc2c9",
  pageTypeSlug: "module",
  slug: "zone-upstream-verify",
  definition: "the ruling on whether the ported LibZone data still matches upstream",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The upstream data file is loaded.",
    },
    {
      invariantKind: "departure",
      statement: "The upstream geo file is loaded.",
    },
    {
      invariantKind: "departure",
      statement: "The preloaded zone names are ruled on.",
    },
    {
      invariantKind: "departure",
      statement: "The public dungeon map ids are ruled on.",
    },
    {
      invariantKind: "departure",
      statement: "The geo data reference table is ruled on.",
    },
    {
      invariantKind: "departure",
      statement: "A zone table is walked inside Lua.",
    },
    {
      invariantKind: "departure",
      statement: "The client language is fixed so loading asks nothing of the game.",
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
