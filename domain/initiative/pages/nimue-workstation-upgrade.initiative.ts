import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const nimueWorkstationUpgrade = {
  id: "01a0a0db-e9da-7bd0-8c3f-a3b412e5d4dc",
  type: "page-type/initiative",
  slug: "nimue-workstation-upgrade",
  domain: "domain/infrastructure",
  persona: "persona/nimue",
  intentStack: [
    { statement: "Agents use only the archive drive for scratch files." },
    { statement: "The archive drive is empty." },
    { statement: "Memory limits are appropriate for the new total memory amount." },
  ],
  constraints: [
    "Agents run on the filesystem holding the live data, so the memory they take cannot be moved to the cluster.",
    "Four dual-rank modules are the hardest arrangement for the memory controller to train, so the rated speed may not hold.",
  ],
} as const satisfies Initiative
