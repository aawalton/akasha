import type { Module } from "@akasha/code-system/module"

export const dataminingEntry = {
  id: "01a06341-d9e8-7007-aaa9-235436e7ef16",
  pageTypeSlug: "module",
  slug: "datamining-entry",
  definition: "where the datamining addon starts and what the addon binds on starting",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Neither miner is running when the addon loads.",
    },
    {
      invariantKind: "departure",
      statement: "A changed game version clears the mined data.",
    },
    {
      invariantKind: "departure",
      statement: "Mining left unfinished resumes once the player is in the world.",
    },
    {
      invariantKind: "departure",
      statement: "Every slash command is registered with the hud addon as well.",
    },
    {
      invariantKind: "departure",
      statement: "A slash command the addon does not know answers with the usage line.",
    },
  ],
} as const satisfies Module
