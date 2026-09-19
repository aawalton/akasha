import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const aranyaMiscCleanup = {
  id: "01a0a006-83f6-7675-ba1d-e39b950540c7",
  type: "page-type/initiative",
  slug: "aranya-misc-cleanup",
  domain: "domain/infrastructure",
  persona: "persona/aranya",
  intentStack: [
    {
      statement: "No code spells a page's address as a plain string.",
      workingMemory:
        "The check check-code/no-page-address-spelled landed experimental at 73671b2; its audit refuses 1036 spellings in 341 files in 6 seconds. A rename reaches a page through the relation index and code through the import index, so a literal address is the one reference nothing files, and why address-restating sweeps every file. The fix per case is to import the page and read its slug, or to declare a relation. Resolving these lets the sweep go and the check into service.",
    },
  ],
} as const satisfies Initiative
