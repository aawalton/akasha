import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const nimueWorkstationUpgrade = {
  id: "01a0a0db-e9da-7bd0-8c3f-a3b412e5d4dc",
  type: "initiative",
  slug: "nimue-workstation-upgrade",
  domain: "domain/infrastructure",
  persona: "nimue",
  intentStack: [
    {
      statement: "The workstation's memory runs at the speed its modules are rated for.",
      workingMemory:
        "Two Kingston KF560C36-32 modules sit in DIMMA2 and DIMMB2 at the JEDEC fallback of 4800 MT/s and 1.1 V. Their rated profile is 6000 MT/s at 36-38-38 and 1.35 V. The change is XMP Profile 1 in the MSI PRO B860-P WIFI firmware. Reading Configured Memory Speed from the DMI memory table says whether it took. Making this change before the second kit is fitted settles that two modules hold 6000 on their own.",
    },
    {
      statement: "The workstation holds 128 GB of memory running stably at a settled speed.",
      workingMemory:
        "A second KF560C36BBEK2-64 kit is bought and not yet fitted. It goes in DIMMA1 and DIMMB1, making four dual-rank modules. 6000 may not hold across four, and 5600 then 5200 are the steps down; anything at or above 4800 is a gain. A memtest86+ run at the settled speed says that speed is stable. Each new module reads Rank 2 if it is the kit bought rather than the single-rank refresh.",
    },
  ],
  constraints: [
    "Agents run on the filesystem holding the live data, so the memory they take cannot be moved to the cluster.",
    "Four dual-rank modules are the hardest arrangement for the memory controller to train, so the rated speed may not hold.",
  ],
} as const satisfies Initiative
