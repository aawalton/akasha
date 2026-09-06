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
        "Both flags landed and are read through `kindNamed`: authored owes writer and readers, restated owes its writer alone, checked owes neither. The carry fires once from `landingAsked`, and the four hand-written `carryReadings` calls are gone. `mechanicalOid` is now `carriedOid` across 30 files, with a stopgap in `readingOf` reading the old key off lines the record already holds. Left: drop that stopgap, and `NOT_OWED_WAS` in `drafting`, once nothing live carries the old spelling.",
    },
  ],
} as const satisfies Initiative
