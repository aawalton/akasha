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
        "Bazzite is installed on the SN850X at deployment 9a7184d5 over btrfs dc99381c, and walton is made again at uid 1000. ESO, the akasha folder whole and code-editor are copied to the places they held; Spotify comes from flatpak and the 111 user units from `akasha deploy`. The SN3000 is never written and mounts at `/mnt/sn3000`. Boot0000 starts the SN850X and Boot0001 the SN3000. Left: one more copy over akasha, `git worktree prune`, and the keyboard, firewalld and printer settings.\n",
    },
  ],
  constraints: [
    "Agents run on the filesystem holding the live data, so the memory they take cannot be moved to the cluster.",
    "Four dual-rank modules are the hardest arrangement for the memory controller to train, so the rated speed may not hold.",
  ],
} as const satisfies Initiative
