import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const dataminingEntry = {
  id: "01a06341-d9e8-7007-aaa9-235436e7ef16",
  type: "module",
  slug: "datamining-entry",
  definition: "where the datamining addon starts and what the addon binds on starting",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Neither miner is running when the addon loads.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A changed game version clears the mined data.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Mining left unfinished resumes once the player is in the world.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every slash command is registered with the hud addon as well.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A slash command the addon does not know answers with the usage line.",
    },
  ],
} as const satisfies Module
