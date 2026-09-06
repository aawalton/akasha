import type { Initiative } from "../initiative.page-type.ts"

export const sophiaWarrantReach = {
  id: "01a076ad-ac77-7efa-8980-4bc6e16bffb8",
  pageTypeSlug: "initiative",
  slug: "sophia-warrant-reach",
  domainSlug: "workspace-package/context",
  personaSlug: "sophia",
  intents: [
    {
      statement:
        "A change kind states separately what its writer owes and what its landing stales for others.",
      workingMemory:
        "Both halves exist; neither is on the kind. The first is `runsWarrants`, which warranting states as `Warrants apply to an authored change alone`, so restated owing nothing is that line rather than a decision. The second is no flag at all: `carryReadings` is called from four hand-written sites, three in refactor and one in move, so only a mechanical change spares its readers, and `replace` at change-checked stales the fleet. Reading carries nine invariants and a `mechanicalOid` field named for the kind.",
    },
  ],
} as const satisfies Initiative
