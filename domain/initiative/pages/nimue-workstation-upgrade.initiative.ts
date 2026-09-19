import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const nimueWorkstationUpgrade = {
  id: "01a0a0db-e9da-7bd0-8c3f-a3b412e5d4dc",
  type: "page-type/initiative",
  slug: "nimue-workstation-upgrade",
  domain: "domain/infrastructure",
  persona: "persona/nimue",
  intentStack: [
    {
      statement:
        "The workstation's live data sits on a drive that does not stall the agents reading it.",
      workingMemory:
        "The SN3000 holding the live data averages 0.45 ms reads and 1.49 ms writes, and IO stalls every task 1.11% of the time. A WD Black SN850X 4 TB is bought. It goes in M.2_1, which is CPU-attached, and the SN3000 moves to a chipset slot for bulk. 2400 TBW is 3.9 years at the rate the drive took 9.8 TB in 5.8 days. The writes are the swarm's own: agent transcripts, and the git objects and regenerated sidecars an apply lands, all CoW on btrfs.",
    },
  ],
  constraints: [
    "Agents run on the filesystem holding the live data, so the memory they take cannot be moved to the cluster.",
    "Four dual-rank modules are the hardest arrangement for the memory controller to train, so the rated speed may not hold.",
  ],
} as const satisfies Initiative
