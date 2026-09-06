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
        "`writerOwesReading` has landed across the pages, the code and the prose, and reads the same in all three. Left: `readersOweReading` does not exist, and the carry it would drive is four hand-written `carryReadings` calls, three in refactor and one in move, so `replace` at change-checked still stales the fleet. `warranting` still states `Warrants apply to an authored change alone`, which restated is about to falsify. `mechanicalOid` still names the kind. `drafting` reads the old header spelling under a stopgap.",
    },
  ],
} as const satisfies Initiative
